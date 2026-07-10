import binascii
import json

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from app.database import initialize_database
from app.schemas import JsonFormatPayload, PasswordPayload, SqlFormatPayload, TextPayload
from app.tools import (
    decode_base64,
    encode_base64,
    format_json,
    format_sql,
    get_json_metadata,
    generate_password,
    generate_uuid,
)


app = FastAPI(title="ERP Toolkit API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5183", "http://127.0.0.1:5183"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup() -> None:
    initialize_database()


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.post("/api/tools/json/format")
def json_format(payload: JsonFormatPayload) -> dict[str, object]:
    try:
        result = format_json(
            text=payload.text,
            indent=payload.indent,
            sort_keys=payload.sort_keys,
            mode=payload.mode,
        )
        return {
            "result": result,
            "valid": True,
            "metadata": get_json_metadata(result),
        }
    except json.JSONDecodeError as exc:
        raise HTTPException(
            status_code=400,
            detail={
                "message": exc.msg,
                "line": exc.lineno,
                "column": exc.colno,
                "position": exc.pos,
            },
        ) from exc


@app.post("/api/tools/base64/encode")
def base64_encode(payload: TextPayload) -> dict[str, str]:
    return {"result": encode_base64(payload.text)}


@app.post("/api/tools/base64/decode")
def base64_decode(payload: TextPayload) -> dict[str, str]:
    try:
        return {"result": decode_base64(payload.text)}
    except (binascii.Error, UnicodeDecodeError) as exc:
        raise HTTPException(status_code=400, detail="Base64 inválido ou conteúdo incompatível com UTF-8.") from exc


@app.get("/api/tools/uuid")
def uuid_generate() -> dict[str, str]:
    return {"uuid": generate_uuid()}


@app.post("/api/tools/password")
def password_generate(payload: PasswordPayload) -> dict[str, str]:
    try:
        return {
            "password": generate_password(
                length=payload.length,
                include_uppercase=payload.include_uppercase,
                include_lowercase=payload.include_lowercase,
                include_numbers=payload.include_numbers,
                include_symbols=payload.include_symbols,
            )
        }
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc


@app.post("/api/tools/sql/format")
def sql_format(payload: SqlFormatPayload) -> dict[str, str]:
    return {"result": format_sql(payload.sql)}
