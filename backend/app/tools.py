import base64
import json
import re
import secrets
import string
import uuid


SQL_KEYWORDS = [
    "SELECT",
    "FROM",
    "WHERE",
    "INNER JOIN",
    "LEFT JOIN",
    "RIGHT JOIN",
    "FULL JOIN",
    "JOIN",
    "GROUP BY",
    "ORDER BY",
    "HAVING",
    "LIMIT",
    "OFFSET",
    "VALUES",
    "SET",
]


def format_json(text: str, indent: int = 2) -> str:
    parsed = json.loads(text)
    return json.dumps(parsed, indent=indent, ensure_ascii=False, sort_keys=True)


def encode_base64(text: str) -> str:
    return base64.b64encode(text.encode("utf-8")).decode("utf-8")


def decode_base64(text: str) -> str:
    return base64.b64decode(text.encode("utf-8"), validate=True).decode("utf-8")


def generate_uuid() -> str:
    return str(uuid.uuid4())


def generate_password(
    length: int,
    include_uppercase: bool,
    include_lowercase: bool,
    include_numbers: bool,
    include_symbols: bool,
) -> str:
    groups = []
    if include_uppercase:
        groups.append(string.ascii_uppercase)
    if include_lowercase:
        groups.append(string.ascii_lowercase)
    if include_numbers:
        groups.append(string.digits)
    if include_symbols:
        groups.append("!@#$%^&*()-_=+[]{};:,.?/|")

    if not groups:
        raise ValueError("At least one character group must be selected.")

    alphabet = "".join(groups)
    required = [secrets.choice(group) for group in groups]
    remaining = [secrets.choice(alphabet) for _ in range(length - len(required))]
    password_chars = required + remaining
    secrets.SystemRandom().shuffle(password_chars)
    return "".join(password_chars)


def format_sql(sql: str) -> str:
    formatted = " ".join(sql.strip().split())

    for keyword in SQL_KEYWORDS:
        pattern = re.compile(rf"\b{re.escape(keyword)}\b", re.IGNORECASE)
        formatted = pattern.sub(keyword, formatted)

    break_keywords = [keyword for keyword in SQL_KEYWORDS if keyword != "SELECT"]
    for keyword in break_keywords:
        formatted = re.sub(rf"\s+{re.escape(keyword)}\b", f"\n{keyword}", formatted)

    formatted = re.sub(r",\s*", ",\n  ", formatted)
    return formatted.strip()
