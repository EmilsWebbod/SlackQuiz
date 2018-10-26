import * as redis from 'redis';

const redisClient = redis.createClient(process.env.REDIS_URL);
redisClient.on('ready', () => console.log('Connected successfully to redis'));

export default redisClient;
