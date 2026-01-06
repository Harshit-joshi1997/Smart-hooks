const { Redis } = require('ioredis');

// Configuration using environment variables with working fallbacks
const redis = new Redis(process.env.REDIS_URL, {
    maxRetriesPerRequest: null
});

redis.on('connect', () => {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.error('Redis connection error:', err);
});

module.exports = redis;
