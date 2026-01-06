const Redis = require('ioredis');

// Configuration using environment variables with working fallbacks
const redis = new Redis({
    host: process.env.REDIS_HOST || 'redis-15871.crce219.us-east-1-4.ec2.cloud.redislabs.com',
    port: process.env.REDIS_PORT || 15871,
    username: process.env.REDIS_USERNAME || 'default',
    password: process.env.REDIS_PASSWORD || '3KfC4jW3hPx5Imi1o2vzUls8UzK3dOfu',
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redis;
