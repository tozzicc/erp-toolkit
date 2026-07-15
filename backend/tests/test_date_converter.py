import unittest

from app.date_formats import DateFormat
from app.main import app, date_convert
from app.schemas import DateConvertPayload
from app.tools import convert_date


class DateConverterTests(unittest.TestCase):
    def test_required_conversions(self) -> None:
        cases = (
            ("10/07/2026 14:30", DateFormat.DATETIME_BR, DateFormat.ISO_8601, "2026-07-10T14:30:00"),
            ("2026-07-10T14:30:00", DateFormat.ISO_8601, DateFormat.DATETIME_BR, "10/07/2026 14:30"),
            ("10/07/2026 14:30", DateFormat.DATETIME_BR, DateFormat.UNIX_TIMESTAMP, "1783693800"),
            ("1783693800", DateFormat.UNIX_TIMESTAMP, DateFormat.DATETIME_BR, "10/07/2026 14:30"),
            ("10/07/2026", DateFormat.DATE_BR, DateFormat.DATE_ISO, "2026-07-10"),
        )
        for value, source, target, expected in cases:
            with self.subTest(value=value, target=target):
                self.assertEqual(convert_date(value, source, target)["result"], expected)

    def test_rejects_nonexistent_dates(self) -> None:
        for value in ("31/02/2026", "29/02/2025", "99/99/9999"):
            with self.subTest(value=value), self.assertRaisesRegex(ValueError, "Data inválida"):
                convert_date(value, DateFormat.DATE_BR, DateFormat.DATE_ISO)

    def test_rejects_invalid_timestamp(self) -> None:
        for value in ("abc", "12.5", "999999999999999999999"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                convert_date(value, DateFormat.UNIX_TIMESTAMP, DateFormat.DATE_BR)

    def test_endpoint_contract_and_openapi(self) -> None:
        payload = DateConvertPayload(
            value="10/07/2026",
            source_format=DateFormat.DATE_BR,
            target_format=DateFormat.DATE_ISO,
        )
        self.assertEqual(date_convert(payload)["result"], "2026-07-10")
        openapi = app.openapi()
        self.assertIn("/api/tools/date/convert", openapi["paths"])
        self.assertEqual(len(openapi["components"]["schemas"]["DateFormat"]["enum"]), 5)


if __name__ == "__main__":
    unittest.main()
