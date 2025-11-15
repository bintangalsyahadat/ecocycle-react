import jwtEncode from "jwt-encode";

export function generateApiJwt() {
    const payload = {
        iss: import.meta.env.VITE_JWT_ISSUER,
        aud: import.meta.env.VITE_JWT_AUDIENCE,
        email: import.meta.env.VITE_JWT_EMAIL,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
    };

    const secret = import.meta.env.VITE_JWT_KEY;
    return jwtEncode(payload, secret);
}
