import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "../secrets";

export const redisClient = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
