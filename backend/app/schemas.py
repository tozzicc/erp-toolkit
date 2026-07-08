from pydantic import BaseModel, Field


class TextPayload(BaseModel):
    text: str = ""


class JsonFormatPayload(BaseModel):
    text: str
    indent: int = Field(default=2, ge=0, le=8)


class PasswordPayload(BaseModel):
    length: int = Field(default=16, ge=4, le=128)
    include_uppercase: bool = True
    include_lowercase: bool = True
    include_numbers: bool = True
    include_symbols: bool = True


class SqlFormatPayload(BaseModel):
    sql: str
