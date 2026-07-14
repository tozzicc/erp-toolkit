import unittest

from app.main import app
from app.sql_dialects import SqlDialect
from app.tools import format_sql, minify_sql, validate_sql


COMPLEX_SQL = """
with active as (
  select id, status from customers where status = 'active'
)
select a.id,
  case
    when a.status = 'active' then 'A B'
    else 'X'
  end as label
from active a
left join orders o on o.customer_id = a.id
where a.id in (select customer_id from orders)
union all
select id, name from archived_customers
order by id
"""


class SqlFormatterTests(unittest.TestCase):
    def test_formats_supported_structures(self) -> None:
        result = format_sql(COMPLEX_SQL)

        for keyword in ("WITH", "SELECT", "FROM", "WHERE", "LEFT JOIN", "UNION ALL", "CASE", "END", "ORDER BY"):
            self.assertIn(keyword, result)
        self.assertIn("(\n", result)
        self.assertIn("'A B'", result)

    def test_places_main_select_after_cte_on_new_line(self) -> None:
        result = format_sql("with clientes as (select id from clientes) select * from clientes")

        self.assertIn("WITH clientes AS (\n    SELECT", result)
        self.assertIn("\n)\n\nSELECT *", result)

    def test_places_select_after_all_set_operators(self) -> None:
        sql = "select id from a union all select id from b union select id from c intersect select id from d except select id from e"
        result = format_sql(sql)

        for operator in ("UNION ALL", "UNION", "INTERSECT", "EXCEPT"):
            self.assertIn(f"{operator}\nSELECT", result)

    def test_formats_join_group_having_and_order(self) -> None:
        sql = "select a.id,b.name from a inner join b on b.id=a.id group by a.id,b.name having count(*)>0 order by b.name"
        result = format_sql(sql)

        for keyword in ("INNER JOIN", "GROUP BY", "HAVING", "ORDER BY"):
            self.assertIn(keyword, result)

    def test_formats_all_join_types(self) -> None:
        queries = {
            "JOIN": "select a.id from a join b on b.id=a.id",
            "LEFT JOIN": "select a.id from a left join b on b.id=a.id",
            "RIGHT JOIN": "select a.id from a right join b on b.id=a.id",
            "FULL JOIN": "select a.id from a full join b on b.id=a.id",
            "CROSS JOIN": "select a.id from a cross join b",
        }

        for keyword, sql in queries.items():
            with self.subTest(keyword=keyword):
                self.assertIn(keyword, format_sql(sql))

    def test_honors_formatting_options(self) -> None:
        sql = "select a.id, case when a.id=1 then 'A' else 'B' end label from a left join b on b.id=a.id"
        lowercase = format_sql(sql, keywords_uppercase=False)
        compact_lines = format_sql(sql, break_lines=False)
        join_indented = format_sql(sql, indent_join=True)
        join_not_indented = format_sql(sql, indent_join=False)
        case_indented = format_sql(sql, indent_case=True)
        case_not_indented = format_sql(sql, indent_case=False)
        select_aligned = format_sql(sql, align_select=True)
        select_not_aligned = format_sql(sql, align_select=False)

        self.assertIn("select", lowercase)
        self.assertNotIn("\n", compact_lines)
        self.assertNotEqual(join_indented, join_not_indented)
        self.assertNotEqual(case_indented, case_not_indented)
        self.assertNotEqual(select_aligned, select_not_aligned)

    def test_minifies_without_changing_string_content(self) -> None:
        result = minify_sql("select id, 'A B' as label\nfrom customers\nwhere id = 1")

        self.assertNotIn("\n", result)
        self.assertIn("'A B'", result)
        self.assertIn("SELECT", result)

    def test_validates_parentheses(self) -> None:
        with self.assertRaisesRegex(ValueError, "Parênteses"):
            validate_sql("select * from customers where (id = 1")

    def test_validates_quotes(self) -> None:
        with self.assertRaisesRegex(ValueError, "Aspas"):
            validate_sql("select * from customers where name = 'ERP")

    def test_validates_select_without_from(self) -> None:
        with self.assertRaisesRegex(ValueError, "identificador de coluna"):
            validate_sql("select id")

    def test_accepts_expression_selects_without_from(self) -> None:
        valid_queries = (
            "SELECT 1;",
            "SELECT GETDATE();",
            "SELECT CURRENT_DATE;",
            "SELECT CURRENT_TIMESTAMP;",
            "SELECT @@VERSION;",
            "SELECT SYSDATETIME();",
            "SELECT NEWID();",
            "SELECT CAST(1 AS INT);",
            "SELECT CONVERT(VARCHAR,GETDATE());",
        )

        for sql in valid_queries:
            with self.subTest(sql=sql):
                validate_sql(sql)

    def test_formats_exists_and_nested_subqueries(self) -> None:
        sql = "select a.id from a where exists (select 1 from b where b.id=a.id) and not exists (select 1 from c where c.id=a.id) and a.id in (select id from d)"
        result = format_sql(sql)

        self.assertIn("EXISTS (\n", result)
        self.assertIn("NOT EXISTS (\n", result)
        self.assertIn(" IN (\n", result)

    def test_validates_case_without_end(self) -> None:
        with self.assertRaisesRegex(ValueError, "CASE sem END"):
            validate_sql("select case when id = 1 then 'A' from customers")

    def test_openapi_documents_sql_options(self) -> None:
        schema = app.openapi()["components"]["schemas"]["SqlFormatPayload"]

        self.assertEqual(schema["properties"]["mode"]["enum"], ["format", "minify", "validate"])
        for property_name in ("keywords_uppercase", "break_lines", "indent_join", "indent_case", "align_select"):
            self.assertIn(property_name, schema["properties"])

        dialect_schema = app.openapi()["components"]["schemas"]["SqlDialect"]
        self.assertEqual(
            dialect_schema["enum"],
            ["sqlserver", "postgresql", "mysql", "mariadb", "oracle", "sqlite", "ansi"],
        )
        self.assertEqual(schema["properties"]["dialect"]["default"], "sqlserver")
        self.assertEqual(len(schema["examples"]), 3)

    def test_accepts_queries_supported_by_each_dialect(self) -> None:
        queries = {
            SqlDialect.SQLSERVER: ("SELECT GETDATE();", "SELECT TOP 10 * FROM SA1010;"),
            SqlDialect.POSTGRESQL: ("SELECT NOW();", "SELECT * FROM clientes LIMIT 10;"),
            SqlDialect.MYSQL: ("SELECT CURDATE();", "SELECT * FROM clientes LIMIT 10;"),
            SqlDialect.MARIADB: ("SELECT NOW();", "SELECT * FROM clientes LIMIT 10;"),
            SqlDialect.ORACLE: ("SELECT SYSDATE FROM DUAL;", "SELECT * FROM clientes FETCH FIRST 10 ROWS ONLY;"),
            SqlDialect.SQLITE: ("SELECT DATE('now');", "SELECT * FROM clientes LIMIT 10;"),
            SqlDialect.ANSI: ("SELECT CURRENT_DATE;", "SELECT * FROM clientes;"),
        }

        for dialect, dialect_queries in queries.items():
            for sql in dialect_queries:
                with self.subTest(dialect=dialect, sql=sql):
                    validate_sql(sql, dialect=dialect)
                    self.assertTrue(format_sql(sql, dialect=dialect))
                    self.assertTrue(minify_sql(sql, dialect=dialect))

    def test_rejects_cross_dialect_constructs_with_specific_messages(self) -> None:
        invalid_queries = (
            ("SELECT GETDATE();", SqlDialect.POSTGRESQL, "GETDATE.*PostgreSQL"),
            ("SELECT * FROM clientes LIMIT 10;", SqlDialect.SQLSERVER, "LIMIT.*SQL Server"),
            ("SELECT TOP 10 * FROM clientes;", SqlDialect.POSTGRESQL, "TOP.*PostgreSQL"),
            ("SELECT 1;", SqlDialect.ORACLE, "FROM DUAL"),
        )

        for sql, dialect, message in invalid_queries:
            with self.subTest(dialect=dialect, sql=sql), self.assertRaisesRegex(ValueError, message):
                validate_sql(sql, dialect=dialect)

    def test_dialect_validation_ignores_literals_and_comments(self) -> None:
        validate_sql("SELECT 'GETDATE()' AS value; -- LIMIT 10", dialect=SqlDialect.POSTGRESQL)

    def test_oracle_accepts_from_dual(self) -> None:
        validate_sql("SELECT SYSTIMESTAMP FROM DUAL;", dialect=SqlDialect.ORACLE)


if __name__ == "__main__":
    unittest.main()
