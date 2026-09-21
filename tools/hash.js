const secret = "A secret value that nobody can guess.";
const options = {
    name: "PBKDF2",
    hash: "SHA-256",
    iterations: 5000,
    salt: new Uint8Array(Array.from(new TextEncoder().encode(secret)))
};

export async function hashPassword(password) {
    const inputBytes = new TextEncoder().encode(password);
    const key = await crypto.subtle.importKey("raw", inputBytes, "PBKDF2", false, ["deriveBits"]);
    const buffer = await crypto.subtle.deriveBits(options, key, 256);
    const padded = Array.from(new Uint8Array(buffer)).map(byte =>byte.toString(16).padStart(2, 0));
    return padded.join("");
};

export async function verifyPassword(password, storedHash) {
    const candidateHash = await hashPassword(password);
    return candidateHash === storedHash;
}