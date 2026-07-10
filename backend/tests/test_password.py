import itertools
import math
import string
import unittest

from app.main import app
from app.tools import AMBIGUOUS_CHARACTERS, PASSWORD_SYMBOLS, generate_password


class PasswordTests(unittest.TestCase):
    def test_supported_lengths(self) -> None:
        for length in (8, 12, 16, 20, 24, 32, 48, 64):
            with self.subTest(length=length):
                result = generate_password(length, True, True, True, True, False)
                self.assertEqual(len(result["password"]), length)

    def test_all_character_group_combinations(self) -> None:
        group_definitions = (string.ascii_uppercase, string.ascii_lowercase, string.digits, PASSWORD_SYMBOLS)

        for selections in itertools.product((False, True), repeat=4):
            if not any(selections):
                continue

            for exclude_ambiguous in (False, True):
                with self.subTest(selections=selections, exclude_ambiguous=exclude_ambiguous):
                    result = generate_password(16, *selections, exclude_ambiguous)
                    password = result["password"]

                    self.assertEqual(len(password), 16)
                    for selected, group in zip(selections, group_definitions, strict=True):
                        if selected:
                            allowed_group = set(group) - AMBIGUOUS_CHARACTERS if exclude_ambiguous else set(group)
                            self.assertTrue(any(character in allowed_group for character in password))

                    if exclude_ambiguous:
                        self.assertTrue(set(password).isdisjoint(AMBIGUOUS_CHARACTERS))

    def test_rejects_empty_character_selection(self) -> None:
        with self.assertRaisesRegex(ValueError, "Selecione pelo menos um grupo"):
            generate_password(16, False, False, False, False, False)

    def test_entropy_and_strength(self) -> None:
        result = generate_password(16, True, True, True, True, False)
        expected_entropy = round(16 * math.log2(26 + 26 + 10 + len(PASSWORD_SYMBOLS)), 2)

        self.assertEqual(result["entropy"], expected_entropy)
        self.assertEqual(result["strength"], "Muito forte")

    def test_all_strength_levels(self) -> None:
        cases = (
            ((8, False, False, True, False, False), "Muito fraca"),
            ((8, True, False, False, False, True), "Fraca"),
            ((8, False, True, False, False, False), "Média"),
            ((16, False, True, False, False, False), "Forte"),
            ((16, True, True, True, True, False), "Muito forte"),
        )

        for arguments, expected_strength in cases:
            with self.subTest(expected_strength=expected_strength):
                self.assertEqual(generate_password(*arguments)["strength"], expected_strength)

    def test_openapi_documents_password_contract(self) -> None:
        schema = app.openapi()["components"]["schemas"]["PasswordPayload"]

        self.assertEqual(schema["properties"]["length"]["enum"], [8, 12, 16, 20, 24, 32, 48, 64])
        self.assertIn("excludeAmbiguous", schema["properties"])


if __name__ == "__main__":
    unittest.main()
