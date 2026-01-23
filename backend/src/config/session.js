import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import knex from "./db.js";

const PostgresStore = connectPgSimple(session);
const isProd = process.env.NODE_ENV !== "development";
const forceDbSession = process.env.USE_DB_SESSION === "true";

const getSessionStore = () => {
  if (isProd || forceDbSession) {
    try {
      const store = new PostgresStore({
        knex: knex,
        tableName: "sessions",
        createTableIfMissing: true,
      });
      console.log("✅ Session Store: PostgreSQL (Primary)");
      return store;
    } catch (error) {
      console.warn("⚠️ PG Store failed. Fallback to MemoryStore");
      return new session.MemoryStore();
    }
  }

  console.log("🛠️  Session Store: Memory (Dev DX Mode)");
  return new session.MemoryStore();
};

export const sessionConfig = session({
  store: getSessionStore(),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true, // Required: Protects against XSS
    secure: isProd, // true in Prod (HTTPS), false in Dev (HTTP)
    maxAge: 24 * 60 * 60 * 1000,
    sameSite: isProd ? "none" : "lax", // 'None' for Prod (cross-site), 'Lax' for Dev (localhost)
  },
});
