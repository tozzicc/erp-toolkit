from typing import Literal

from pydantic import BaseModel, Field


class TextPayload(BaseModel):
    text: str = ""


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


class SqlFormatPayload(BaseModel):
    sql: str = Field(min_length=1)
    mode: Literal["format", "minify", "validate"] = "format"
    keywords_uppercase: bool = True
    break_lines: bool = True
    indent_join: bool = True
    indent_case: bool = True
    align_select: bool = True
