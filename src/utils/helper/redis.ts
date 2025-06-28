import { createClient } from "redis";

const redisClient = createClient({
  url: process.env.REDIS_URL,
});
redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

async function connectRedis() {
  try {
    await redisClient.connect();
    console.log("Connected to Redis successfully");
  } catch (err) {
    console.error("Redis Connection Error:", err);
  }
}

connectRedis();

export default redisClient;
