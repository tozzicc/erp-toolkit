import hashlib
import unittest

from pydantic import ValidationError

from app.hash_algorithms import HashAlgorithm
from app.main import app, hash_generate
from app.schemas import HashPayload
from app.tools import generate_hash


class HashGeneratorTests(unittest.TestCase):
    def test_known_hashes_for_test(self) -> None:
        expected_hashes = {
            HashAlgorithm.MD5: "098f6bcd4621d373cade4e832627b4f6",
            HashAlgorithm.SHA1: "a94a8fe5ccb19ba61c4c0873d391e987982fbbd3",
            HashAlgorithm.SHA256: "9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08",
        }

        for algorithm, expected_hash in expected_hashes.items():
            with self.subTest(algorithm=algorithm):
                self.assertEqual(generate_hash("test", algorithm)["hash"], expected_hash)

    def test_all_supported_algorithms_and_lengths(self) -> None:
        expected_lengths = {
            HashAlgorithm.MD5: 32,
            HashAlgorithm.SHA1: 40,
            HashAlgorithm.SHA256: 64,
            HashAlgorithm.SHA384: 96,
            HashAlgorithm.SHA512: 128,
        }

        for algorithm, expected_length in expected_lengths.items():
            with self.subTest(algorithm=algorithm):
                result = generate_hash("ERP Toolkit", algorithm)
                self.assertEqual(result["hash_characters"], expected_length)
                self.assertEqual(len(result["hash"]), expected_length)

    def test_preserves_utf8_content_semantics(self) -> None:
        contents = (
            " texto com espaços ",
            "linha 1\nlinha 2",
            "Olá, Camilo 🚀",
            '{"produto":"ERP Toolkit","ativo":true}',
            "x" * 1_000_000,
        )

        for content in contents:
            with self.subTest(content_length=len(content)):
                result = generate_hash(content, HashAlgorithm.SHA256)
                self.assertEqual(result["hash"], hashlib.sha256(content.encode("utf-8")).hexdigest())
                self.assertEqual(result["input_characters"], len(content))
                self.assertEqual(result["input_bytes"], len(content.encode("utf-8")))

    def test_uppercase_output(self) -> None:
        result = generate_hash("test", HashAlgorithm.SHA512, uppercase=True)
        self.assertEqual(result["hash"], hashlib.sha512(b"test").hexdigest().upper())
        self.assertTrue(result["uppercase"])

    def test_rejects_empty_content_and_unsupported_algorithm(self) -> None:
        with self.assertRaises(ValidationError):
            HashPayload(content="", algorithm=HashAlgorithm.SHA256)
        with self.assertRaises(ValidationError):
            HashPayload(content="test", algorithm="crc32")

    def test_endpoint_returns_documented_contract(self) -> None:
        result = hash_generate(HashPayload(content="test", algorithm=HashAlgorithm.SHA256))
        self.assertEqual(result["algorithm"], HashAlgorithm.SHA256)
        for field in (
            "hash",
            "uppercase",
            "input_characters",
            "input_bytes",
            "hash_characters",
            "processing_time_ms",
        ):
            self.assertIn(field, result)

    def test_openapi_documents_hash_contract(self) -> None:
        openapi = app.openapi()
        schema = openapi["components"]["schemas"]["HashPayload"]
        algorithm_schema = openapi["components"]["schemas"]["HashAlgorithm"]
        operation = openapi["paths"]["/api/tools/hash"]["post"]

        self.assertEqual(algorithm_schema["enum"], ["md5", "sha1", "sha256", "sha384", "sha512"])
        self.assertEqual(schema["properties"]["algorithm"]["default"], "sha256")
        self.assertEqual(len(schema["examples"]), 3)
        self.assertIn("200", operation["responses"])
        self.assertIn("422", operation["responses"])


if __name__ == "__main__":
    unittest.main()
