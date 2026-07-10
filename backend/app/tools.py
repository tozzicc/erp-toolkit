import base64
import json
import math
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

AMBIGUOUS_CHARACTERS = frozenset("0Oo1lI5S8B6G")
PASSWORD_SYMBOLS = "!@#$%^&*()-_=+[]{};:,.?/|"


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
