from dataclasses import dataclass
from enum import Enum


class SqlDialect(str, Enum):
    SQLSERVER = "sqlserver"
    POSTGRESQL = "postgresql"
    MYSQL = "mysql"
    MARIADB = "mariadb"
    ORACLE = "oracle"
    SQLITE = "sqlite"
    ANSI = "ansi"


@dataclass(frozen=True)
class SqlDialectRules:
    label: str
    forbidden_functions: frozenset[str] = frozenset()
    supports_limit: bool = False
    supports_top: bool = False
    supports_fetch_first: bool = False
    requires_from_dual: bool = False


SQL_DIALECT_RULES: dict[SqlDialect, SqlDialectRules] = {
    SqlDialect.SQLSERVER: SqlDialectRules("SQL Server", frozenset({"NOW", "CURDATE"}), supports_top=True),
    SqlDialect.POSTGRESQL: SqlDialectRules(
        "PostgreSQL", frozenset({"GETDATE", "SYSDATETIME", "NEWID", "CURDATE", "CONVERT"}), supports_limit=True
    ),
    SqlDialect.MYSQL: SqlDialectRules(
        "MySQL", frozenset({"GETDATE", "SYSDATETIME", "NEWID"}), supports_limit=True
    ),
    SqlDialect.MARIADB: SqlDialectRules(
        "MariaDB", frozenset({"GETDATE", "SYSDATETIME", "NEWID"}), supports_limit=True
    ),
    SqlDialect.ORACLE: SqlDialectRules(
        "Oracle",
        frozenset({"GETDATE", "SYSDATETIME", "NEWID", "NOW", "CURDATE", "CONVERT"}),
        supports_fetch_first=True,
        requires_from_dual=True,
    ),
    SqlDialect.SQLITE: SqlDialectRules(
        "SQLite", frozenset({"GETDATE", "SYSDATETIME", "NEWID", "NOW", "CURDATE", "CONVERT"}), supports_limit=True
    ),
    SqlDialect.ANSI: SqlDialectRules("Genérico / ANSI SQL"),
}


def get_sql_dialect_rules(dialect: SqlDialect) -> SqlDialectRules:
    return SQL_DIALECT_RULES[dialect]
