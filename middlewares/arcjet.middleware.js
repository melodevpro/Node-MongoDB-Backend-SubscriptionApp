
import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) return res.status(429).json({ error: "Limite de peticiones alcanzada" });
            if (decision.reason.isBot()) return res.status(403).json({ error: "Bots no permitidos" });
            return res.status(403).json({ error: "Acceso denegado" });
        }
        next();
    } catch (error) {
        console.log(`Error al conectar a Arcjet: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;