from typing import Literal

from pydantic import BaseModel, Field

from app.date_formats import DateFormat
from app.hash_algorithms import HashAlgorithm
from app.sql_dialects import SqlDialect


class TextPayload(BaseModel):
    text: str = ""


class DateConvertPayload(BaseModel):
    value: str = Field(min_length=1, description="Data ou timestamp a converter.")
    source_format: DateFormat
    target_format: DateFormat

    model_config = {
        "json_schema_extra": {
            "example": {
                "value": "10/07/2026 14:30",
                "source_format": "dd/MM/yyyy HH:mm",
                "target_format": "ISO 8601",
            }
        }
    }


class DateConvertResponse(BaseModel):
    result: str
    source_format: DateFormat
    target_format: DateFormat
    input_characters: int
    processing_time_ms: int


class JsonFormatPayload(BaseModel):
    text: str = Field(min_length=1)
    indent: int = Field(default=2, ge=0, le=8)
    sort_keys: bool = True
    mode: Literal["format", "minify"] = "format"


class PasswordPayload(BaseModel):
    length: Literal[8, 12, 16, 20, 24, 32, 48, 64] = 16
    uppercase: bool = True
    lowercase: bool = True
    numbers: bool = True
    symbols: bool = True
    exclude_ambiguous: bool = Field(default=False, alias="excludeAmbiguous")


class HashPayload(BaseModel):
    content: str = Field(min_length=1, description="Conteúdo UTF-8 usado para gerar o hash.")
    algorithm: HashAlgorithm = HashAlgorithm.SHA256
    uppercase: bool = False

    model_config = {
        "json_schema_extra": {
            "examples": [
                {"summary": "SHA-256", "value": {"content": "test", "algorithm": "sha256", "uppercase": False}},
                {"summary": "SHA-512", "value": {"content": "ERP Toolkit", "algorithm": "sha512", "uppercase": True}},
                {"summary": "MD5 legado", "value": {"content": "integração legada", "algorithm": "md5", "uppercase": False}},
            ]
        }
    }


class HashResponse(BaseModel):
    hash: str
    algorithm: HashAlgorithm
    uppercase: bool
    input_characters: int
    input_bytes: int
    hash_characters: int
    processing_time_ms: int

    model_config = {
        "json_schema_extra": {
            "example": {
                "hash": "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
                "algorithm": "sha256",
                "uppercase": False,
                "input_characters": 4,
                "input_bytes": 4,
                "hash_characters": 64,
                "processing_time_ms": 1,
            }
        }
    }


class SqlFormatPayload(BaseModel):
    sql: str = Field(min_length=1)
    dialect: SqlDialect = SqlDialect.SQLSERVER
    mode: Literal["format", "minify", "validate"] = "format"
    keywords_uppercase: bool = True
    break_lines: bool = True
    indent_join: bool = True
    indent_case: bool = True
    align_select: bool = True

    model_config = {
        "json_schema_extra": {
            "examples": [
                {"summary": "SQL Server", "value": {"sql": "SELECT GETDATE();", "dialect": "sqlserver", "mode": "format"}},
                {"summary": "PostgreSQL", "value": {"sql": "SELECT NOW();", "dialect": "postgresql", "mode": "validate"}},
                {"summary": "Oracle", "value": {"sql": "SELECT SYSDATE FROM DUAL;", "dialect": "oracle", "mode": "format"}},
            ]
        }
    }
