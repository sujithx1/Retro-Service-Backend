import { createClient } from "redis";

const redisClient = createClient({
  url: "redis://default:Ryd92nVSW4229Q6ovcHRNEP8jJwlZep7@redis-17917.c265.us-east-1-2.ec2.redns.redis-cloud.com:17917",
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
