const logger = require("../utils/logger");

const runDockerContainer = async (clientName, image) => {
  logger(`Simulating Docker deployment for ${clientName}`);

  await new Promise((resolve) => setTimeout(resolve, 4000));

  return {
    success: true,
    containerId: "simulated-container",
  };
};

module.exports = {
  runDockerContainer,
};