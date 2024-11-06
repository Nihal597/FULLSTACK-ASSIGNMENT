import { validateToken } from "./auth-service.js"

export const validateMiddleware = (req, res, next) => {
    // Get token from authorization header
    const authHeader = req.header("authorization");
    
    if (!authHeader) {
        res.json({ message: "no_auth_header" })
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.json({ message: "no_token" })
        return;
    }

    // Verify token and get token payload
    const [data, error] = validateToken(token);

    if (error) {
        res.status(401).json({
            message: "Unauthorized",
            error
        })
        return;
    }

    // Add payload to req.user
    req.user = data;

    next();
}