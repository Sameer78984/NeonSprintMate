import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";

import dotenv from "dotenv";
dotenv.config();

// init arcjet

export const arc = arcjet({
  key: process.env.ARCJET_KEY,
  characteristics: ["ip.src"],
  rules: [
    // protect from SQL injection attacks, XSS attacks, CSRF attacks
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      // block all except search engine bots
      allow: [
        "CATEGORY:SEARCH_ENGINE",
        // SEE FULL LIST: https://docs.arcjet.com/bot-list
      ],
    }),
    // rate limit requests to 100 requests per minute per IP
    tokenBucket({
      mode: "LIVE",
      refillRate: 10,
      interval: 10,
      capacity: 50,
    }),
  ],
});
