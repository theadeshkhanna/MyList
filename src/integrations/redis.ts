import Redis from "ioredis";
import { REDIS_URI } from "../secrets";

export const redisClient = new Redis(REDIS_URI, {
  tls: {
    rejectUnauthorized: false,
  },
});
