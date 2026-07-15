import base64
import hashlib
import json
import math
import re
import secrets
import string
import uuid
from datetime import datetime, timezone
from time import perf_counter

import sqlparse
from sqlparse import tokens as sql_tokens

from app.sql_dialects import SqlDialect, get_sql_dialect_rules
from app.hash_algorithms import HashAlgorithm
from app.date_formats import DateFormat


AMBIGUOUS_CHARACTERS = frozenset("0Oo1lI5S8B6G")
PASSWORD_SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/|"
SQL_SET_OPERATOR_PATTERN = r"UNION(?:\s+ALL)?|INTERSECT|EXCEPT"

DATE_FORMAT_PATTERNS = {
    DateFormat.DATE_BR: "%d/%m/%Y",
    DateFormat.DATETIME_BR: "%d/%m/%Y %H:%M",
    DateFormat.ISO_8601: "%Y-%m-%dT%H:%M:%S",
    DateFormat.DATE_ISO: "%Y-%m-%d",
}


def convert_date(value: str, source_format: DateFormat, target_format: DateFormat) -> dict[str, object]:
    started_at = perf_counter()
    normalized_value = value.strip()
    if not normalized_value:
        raise ValueError("Informe uma data para converter.")

    try:
        if source_format == DateFormat.UNIX_TIMESTAMP:
            if not re.fullmatch(r"-?\d+", normalized_value):
                raise ValueError("Timestamp Unix inválido. Informe um valor inteiro em segundos.")
            parsed = datetime.fromtimestamp(int(normalized_value), tz=timezone.utc).replace(tzinfo=None)
        else:
            parsed = datetime.strptime(normalized_value, DATE_FORMAT_PATTERNS[source_format])
    except (OverflowError, OSError, ValueError) as exc:
        if isinstance(exc, ValueError) and str(exc).startswith("Timestamp Unix inválido"):
            raise
        raise ValueError("Data inválida para o formato de origem selecionado.") from exc

    if target_format == DateFormat.UNIX_TIMESTAMP:
        result = str(int(parsed.replace(tzinfo=timezone.utc).timestamp()))
    else:
        result = parsed.strftime(DATE_FORMAT_PATTERNS[target_format])

    return {
        "result": result,
        "source_format": source_format,
        "target_format": target_format,
        "input_characters": len(value),
        "processing_time_ms": max(1, round((perf_counter() - started_at) * 1000)),
    }


def format_json(text: str, indent: int = 2, sort_keys: bool = True, mode: str = "format") -> str:
    parsed = json.loads(text)
    if mode == "minify":
        return json.dumps(parsed, ensure_ascii=False, separators=(",", ":"), sort_keys=sort_keys)

    return json.dumps(parsed, indent=indent, ensure_ascii=False, sort_keys=sort_keys)


def get_json_metadata(result: str) -> dict[str, int]:
    return {
        "characters": len(result),
        "lines": len(result.splitlines()) if result else 0,
        "bytes": len(result.encode("utf-8")),
    }


def encode_base64(text: str) -> str:
    return base64.b64encode(text.encode("utf-8")).decode("utf-8")


def decode_base64(text: str) -> str:
    return base64.b64decode(text.encode("utf-8"), validate=True).decode("utf-8")


def generate_uuid() -> str:
    return str(uuid.uuid4())


def generate_uuids(count: int) -> list[str]:
    generated = {generate_uuid() for _ in range(count)}
    while len(generated) < count:
        generated.add(generate_uuid())
    return list(generated)


def generate_password(
    length: int,
    uppercase: bool,
    lowercase: bool,
    numbers: bool,
    symbols: bool,
    exclude_ambiguous: bool,
) -> dict[str, str | float]:
    groups: list[str] = []
    if uppercase:
        groups.append(string.ascii_uppercase)
    if lowercase:
        groups.append(string.ascii_lowercase)
    if numbers:
        groups.append(string.digits)
    if symbols:
        groups.append(PASSWORD_SYMBOLS)

    if not groups:
        raise ValueError("Selecione pelo menos um grupo de caracteres.")

    if exclude_ambiguous:
        groups = ["".join(character for character in group if character not in AMBIGUOUS_CHARACTERS) for group in groups]

    alphabet = "".join(groups)
    required = [secrets.choice(group) for group in groups]
    remaining = [secrets.choice(alphabet) for _ in range(length - len(required))]
    password_chars = required + remaining
    secrets.SystemRandom().shuffle(password_chars)
    entropy = round(length * math.log2(len(alphabet)), 2)

    if entropy < 28:
        strength = "Muito fraca"
    elif entropy < 36:
        strength = "Fraca"
    elif entropy < 60:
        strength = "Média"
    elif entropy < 80:
        strength = "Forte"
    else:
        strength = "Muito forte"

    return {
        "password": "".join(password_chars),
        "strength": strength,
        "entropy": entropy,
    }


def generate_hash(content: str, algorithm: HashAlgorithm, uppercase: bool = False) -> dict[str, object]:
    started_at = perf_counter()
    encoded_content = content.encode("utf-8")
    digest = hashlib.new(algorithm.value, encoded_content).hexdigest()
    if uppercase:
        digest = digest.upper()
    processing_time_ms = max(1, round((perf_counter() - started_at) * 1000))

    return {
        "hash": digest,
        "algorithm": algorithm,
        "uppercase": uppercase,
        "input_characters": len(content),
        "input_bytes": len(encoded_content),
        "hash_characters": len(digest),
        "processing_time_ms": processing_time_ms,
    }


def _sql_without_literals_or_comments(sql: str) -> str:
    return re.sub(r"(?s)/\*.*?\*/|--[^\r\n]*|'(?:''|[^'])*'|\"(?:\"\"|[^\"])*\"", " ", sql)


def _validate_sql_dialect(sql: str, dialect: SqlDialect) -> None:
    if dialect == SqlDialect.ANSI:
        return

    rules = get_sql_dialect_rules(dialect)
    comparable_sql = _sql_without_literals_or_comments(sql)
    functions = {match.group(1).upper() for match in re.finditer(r"\b([A-Za-z_][\w$]*)\s*\(", comparable_sql)}
    incompatible_functions = sorted(functions & rules.forbidden_functions)
    if incompatible_functions:
        function = incompatible_functions[0]
        raise ValueError(f"{function}() não é uma função reconhecida no dialeto {rules.label}.")

    if re.search(r"(?i)\bLIMIT\s+\d+\b", comparable_sql) and not rules.supports_limit:
        raise ValueError(f"LIMIT não é compatível com {rules.label}.")
    if re.search(r"(?i)\bSELECT\s+(?:DISTINCT\s+)?TOP(?:\s*\(\s*\d+\s*\)|\s+\d+)", comparable_sql) and not rules.supports_top:
        raise ValueError(f"TOP não é compatível com {rules.label}.")
    if re.search(r"(?i)\bFETCH\s+FIRST\s+\d+\s+ROWS?\s+ONLY\b", comparable_sql) and not rules.supports_fetch_first:
        raise ValueError(f"FETCH FIRST não é compatível com {rules.label}.")


def validate_sql(sql: str, dialect: SqlDialect = SqlDialect.SQLSERVER) -> None:
    stripped = sql.strip()
    if not stripped:
        raise ValueError("Informe um SQL para processar.")

    parentheses = 0
    quote: str | None = None
    index = 0
    while index < len(stripped):
        character = stripped[index]
        if quote:
            if character == quote:
                if index + 1 < len(stripped) and stripped[index + 1] == quote:
                    index += 1
                else:
                    quote = None
        elif character in {"'", '"'}:
            quote = character
        elif character == "(":
            parentheses += 1
        elif character == ")":
            parentheses -= 1
            if parentheses < 0:
                raise ValueError("Parênteses de fechamento sem abertura correspondente.")
        index += 1

    if quote:
        raise ValueError("Aspas não foram fechadas corretamente.")
    if parentheses:
        raise ValueError("Parênteses não foram fechados corretamente.")

    _validate_sql_dialect(stripped, dialect)

    statements = sqlparse.parse(stripped)
    keywords = [
        token.normalized.upper()
        for statement in statements
        for token in statement.flatten()
        if token.ttype in sql_tokens.Keyword or token.ttype in sql_tokens.Keyword.DML
    ]
    for statement in statements:
        statement_keywords = [
            token.normalized.upper()
            for token in statement.flatten()
            if token.ttype in sql_tokens.Keyword or token.ttype in sql_tokens.Keyword.DML
        ]
        if "SELECT" not in statement_keywords or "FROM" in statement_keywords:
            continue

        rules = get_sql_dialect_rules(dialect)
        if rules.requires_from_dual:
            raise ValueError("Em Oracle, esta consulta pode exigir a cláusula FROM DUAL.")

        compact_statement = sqlparse.format(statement.value, strip_whitespace=True).strip().rstrip(";")
        for select_part in re.split(rf"(?i)\b(?:{SQL_SET_OPERATOR_PATTERN})\b", compact_statement):
            match = re.search(r"(?is)\bSELECT\s+(?:DISTINCT\s+)?(.+)$", select_part.strip())
            if not match:
                continue
            expression = match.group(1).strip()
            bare_identifier = re.fullmatch(
                r"[A-Za-z_][\w$]*(?:\.[A-Za-z_][\w$]*)*(?:\s+(?:AS\s+)?[A-Za-z_][\w$]*)?",
                expression,
                re.IGNORECASE,
            )
            if bare_identifier and expression.upper() not in {
                "CURRENT_DATE",
                "CURRENT_TIMESTAMP",
                "NULL",
                "TRUE",
                "FALSE",
            }:
                raise ValueError("Comando SELECT com identificador de coluna exige cláusula FROM.")
    if keywords.count("CASE") != keywords.count("END"):
        raise ValueError("Bloco CASE sem END correspondente.")


def _find_main_select_after_ctes(formatted: str) -> int | None:
    if not re.match(r"(?is)^WITH\b", formatted):
        return None

    depth = 0
    quote: str | None = None
    saw_parenthesis = False
    index = 0
    while index < len(formatted):
        character = formatted[index]
        if quote:
            if character == quote:
                if index + 1 < len(formatted) and formatted[index + 1] == quote:
                    index += 1
                else:
                    quote = None
        elif character in {"'", '"'}:
            quote = character
        elif character == "(":
            depth += 1
            saw_parenthesis = True
        elif character == ")":
            depth -= 1
            if saw_parenthesis and depth == 0:
                remainder = formatted[index + 1 :]
                match = re.match(r"\s*(?:,|SELECT\b)", remainder, re.IGNORECASE)
                if match and match.group(0).strip().upper().startswith("SELECT"):
                    return index + 1 + match.start() + len(match.group(0)) - len(match.group(0).lstrip())
        index += 1
    return None


def _normalize_cte_and_set_layout(formatted: str) -> str:
    main_select_index = _find_main_select_after_ctes(formatted)
    if main_select_index is not None:
        prefix = formatted[:main_select_index].rstrip()
        main_query = formatted[main_select_index:].lstrip()
        prefix_lines = prefix.splitlines()
        interior_indents = [
            len(line) - len(line.lstrip())
            for line in prefix_lines[1:]
            if line.strip() and not line.lstrip().startswith(")")
        ]
        dedent = max(0, min(interior_indents, default=4) - 4)
        normalized_prefix = [prefix_lines[0]]
        for line_index, line in enumerate(prefix_lines[1:], start=1):
            stripped_line = line.lstrip()
            if line_index == len(prefix_lines) - 1 or stripped_line.startswith("),"):
                normalized_prefix.append(stripped_line)
            else:
                normalized_prefix.append(line[dedent:] if line.startswith(" " * dedent) else line)
        formatted = "\n".join(normalized_prefix) + "\n\n" + main_query

    matches = list(re.finditer(rf"(?i)\b({SQL_SET_OPERATOR_PATTERN})\s+SELECT\b", formatted))
    if not matches:
        return formatted

    pieces: list[str] = []
    last_index = 0
    quote: str | None = None
    scan_index = 0
    for match in matches:
        while scan_index < match.start():
            character = formatted[scan_index]
            if quote:
                if character == quote:
                    if scan_index + 1 < len(formatted) and formatted[scan_index + 1] == quote:
                        scan_index += 1
                    else:
                        quote = None
            elif character in {"'", '"'}:
                quote = character
            scan_index += 1

        if quote:
            continue

        pieces.append(formatted[last_index : match.start()].rstrip())
        pieces.append(f"\n{match.group(1)}\nSELECT")
        last_index = match.end()

    pieces.append(formatted[last_index:])
    return "".join(pieces).lstrip()


def format_sql(
    sql: str,
    keywords_uppercase: bool = True,
    break_lines: bool = True,
    indent_join: bool = True,
    indent_case: bool = True,
    align_select: bool = True,
    dialect: SqlDialect = SqlDialect.SQLSERVER,
) -> str:
    validate_sql(sql, dialect=dialect)
    formatted = sqlparse.format(
        sql.strip(),
        keyword_case="upper" if keywords_uppercase else None,
        reindent=break_lines and not align_select,
        reindent_aligned=break_lines and align_select,
        indent_width=2,
        use_space_around_operators=True,
    ).strip()

    if break_lines and not indent_join:
        formatted = re.sub(
            r"(?im)^\s+(INNER JOIN|LEFT JOIN|RIGHT JOIN|FULL JOIN|CROSS JOIN|JOIN)\b",
            r"\1",
            formatted,
        )
    if break_lines and not indent_case:
        formatted = re.sub(r"(?im)^\s+(WHEN|ELSE|END)\b", r"\1", formatted)

    if break_lines:
        formatted = _normalize_cte_and_set_layout(formatted)

    return formatted


def minify_sql(
    sql: str,
    keywords_uppercase: bool = True,
    dialect: SqlDialect = SqlDialect.SQLSERVER,
) -> str:
    validate_sql(sql, dialect=dialect)
    return sqlparse.format(
        sql.strip(),
        keyword_case="upper" if keywords_uppercase else None,
        strip_whitespace=True,
    ).strip()


def get_sql_metadata(result: str) -> dict[str, int]:
    return {
        "characters": len(result),
        "lines": len(result.splitlines()) if result else 0,
        "bytes": len(result.encode("utf-8")),
    }
