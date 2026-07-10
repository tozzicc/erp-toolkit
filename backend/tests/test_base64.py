import binascii
import unittest

from app.tools import decode_base64, encode_base64


class Base64Tests(unittest.TestCase):
    def test_utf8_round_trip(self) -> None:
        values = ["ERP Toolkit", "ação & integração", "Olá 👋 世界", "quebra\nde\tlinha"]

        for value in values:
            with self.subTest(value=value):
                self.assertEqual(decode_base64(encode_base64(value)), value)

    def test_decode_rejects_invalid_base64(self) -> None:
        with self.assertRaises(binascii.Error):
            decode_base64("não é base64")


if __name__ == "__main__":
    unittest.main()
