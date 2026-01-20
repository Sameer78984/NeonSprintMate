import { arc } from "../lib/arcjet.js";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await arc.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too Many Requests - Rate limit exceeded" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "Forbidden - Bot access denied" });
      }
      return res.status(403).json({ error: "Forbidden - Access denied" });
    }

    // Check for spoofed bots
    if (decision.results.some((r) => r.reason.isBot() && r.reason.isSpoofed())) {
      return res.status(403).json({ error: "Forbidden - Spoofed Bot detected" });
    }

    next();
  } catch (err) {
    console.error("Arcjet Middleware Error: ", err);
    next(err);
  }
};