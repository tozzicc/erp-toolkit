from enum import Enum


class DateFormat(str, Enum):
    DATE_BR = "dd/MM/yyyy"
    DATETIME_BR = "dd/MM/yyyy HH:mm"
    ISO_8601 = "ISO 8601"
    UNIX_TIMESTAMP = "Unix Timestamp"
    DATE_ISO = "yyyy-MM-dd"
