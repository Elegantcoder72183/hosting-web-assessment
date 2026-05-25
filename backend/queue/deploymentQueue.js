const { Queue } = require("bullmq");

const redisConnection = require("../config/redis.js");

const deploymentQueue = new Queue("deploymentQueue", {
  connection: redisConnection,
});

module.exports = deploymentQueue;