import unittest
import uuid
from time import perf_counter

from app.main import app
from app.tools import generate_uuid, generate_uuids


class UuidTests(unittest.TestCase):
    def test_generates_valid_uuid_v4(self) -> None:
        result = generate_uuid()
        parsed = uuid.UUID(result)

        self.assertEqual(parsed.version, 4)
        self.assertEqual(str(parsed), result)

    def test_generates_unique_values(self) -> None:
        self.assertNotEqual(generate_uuid(), generate_uuid())

    def test_generates_requested_quantities_without_duplicates(self) -> None:
        for count in (1, 5, 10, 25, 50, 100):
            with self.subTest(count=count):
                results = generate_uuids(count)

                self.assertEqual(len(results), count)
                self.assertEqual(len(set(results)), count)
                self.assertTrue(all(uuid.UUID(value).version == 4 for value in results))

    def test_generates_one_hundred_uuids_quickly(self) -> None:
        started_at = perf_counter()
        generate_uuids(100)

        self.assertLess(perf_counter() - started_at, 1)

    def test_openapi_documents_count_validation(self) -> None:
        operation = app.openapi()["paths"]["/api/tools/uuid"]["get"]
        count_parameter = next(parameter for parameter in operation["parameters"] if parameter["name"] == "count")

        self.assertEqual(count_parameter["schema"]["minimum"], 1)
        self.assertEqual(count_parameter["schema"]["maximum"], 100)


if __name__ == "__main__":
    unittest.main()
