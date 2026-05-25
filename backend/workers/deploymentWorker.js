const { Worker } = require("bullmq");

const redisConnection = require("../config/redis.js");

const Deployment = require("../models/Deployment.js");

const { runDockerContainer } = require("../services/dockerService.js");

const { triggerLambda } = require("../services/lambdaService.js");

const logger = require("../utils/logger.js");

const worker = new Worker(
  "deploymentQueue",

  async (job) => {
    logger(`Processing Job ${job.id}`);

    try {
      const deployment = await Deployment.findById(job.data.deploymentId);

      if (!deployment) return;

      // Running status
      deployment.status = "Running";
      await deployment.save();

      logger("Running Docker Container");

      // Run Docker
      await runDockerContainer(deployment.image, deployment.clientName);

      logger("Docker Container Started");

      // Trigger Lambda
      await triggerLambda(deployment.clientName);

      logger("Lambda Triggered");

      // Final Status
      deployment.status = "Completed";
      await deployment.save();

      logger("Deployment Completed");
    } catch (error) {
      logger(error.message);

      const deployment = await Deployment.findById(job.data.deploymentId);

      if (deployment) {
        deployment.status = "Failed";
        await deployment.save();
      }
    }
  },

  {
    connection: redisConnection,
  }
);

module.exports = worker;
