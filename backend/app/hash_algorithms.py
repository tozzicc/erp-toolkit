from enum import Enum


class HashAlgorithm(str, Enum):
    MD5 = "md5"
    SHA1 = "sha1"
    SHA256 = "sha256"
    SHA384 = "sha384"
    SHA512 = "sha512"


HASH_ALGORITHM_LABELS: dict[HashAlgorithm, str] = {
    HashAlgorithm.MD5: "MD5",
    HashAlgorithm.SHA1: "SHA-1",
    HashAlgorithm.SHA256: "SHA-256",
    HashAlgorithm.SHA384: "SHA-384",
    HashAlgorithm.SHA512: "SHA-512",
}
