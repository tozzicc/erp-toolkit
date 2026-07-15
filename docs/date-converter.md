# Date Converter

O Date Converter converte datas usadas em ERPs, bancos de dados e APIs sem depender das configurações regionais do navegador.

## Formatos

- `dd/MM/yyyy`
- `dd/MM/yyyy HH:mm`
- `ISO 8601`, no formato `yyyy-MM-ddTHH:mm:ss`
- `Unix Timestamp`, inteiro em segundos UTC
- `yyyy-MM-dd`

## API

`POST /api/tools/date/convert`

```json
{
  "value": "10/07/2026 14:30",
  "source_format": "dd/MM/yyyy HH:mm",
  "target_format": "Unix Timestamp"
}
```

Resposta:

```json
{
  "result": "1783693800",
  "source_format": "dd/MM/yyyy HH:mm",
  "target_format": "Unix Timestamp",
  "input_characters": 16,
  "processing_time_ms": 1
}
```

Entradas vazias não são enviadas pela interface. O backend rejeita datas inexistentes, valores que não correspondem exatamente ao formato de origem e timestamps fora do intervalo suportado pela plataforma.
