export async function hash(passowrd: string): Promise<string> {
	const encoder = new TextEncoder();
	const data = encoder.encode(passowrd);

	const buffer = await crypto.subtle.digest("SHA-256", data);
	const arr = Array.from(new Uint8Array(buffer));
	const hash = arr.map((byte) => byte.toString(16).padStart(2, "O")).join("");

	return hash;
}
