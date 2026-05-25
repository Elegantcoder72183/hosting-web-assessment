const Deployment = require("../models/Deployment.js");

const deploymentQueue = require("../queue/deploymentQueue.js");


const createDeployment = async (req, res) => {

  try {

    const { clientName, domain, image } = req.body;

    // Validation
    if (!clientName || !domain || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Save Deployment
    const deployment = await Deployment.create({
      clientName,
      domain,
      image,
      status: "Pending",
    });

    // Add Queue Job
    await deploymentQueue.add("deploy-job", {
      deploymentId: deployment._id,
    });

    res.status(200).json({
      success: true,
      message: "Deployment queued successfully",
      deployment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const getDeploymentStatus = async (req, res) => {

  try {

    const deployment = await Deployment.findById(
      req.params.id
    );

    if (!deployment) {
      return res.status(404).json({
        success: false,
        message: "Deployment not found",
      });
    }

    res.status(200).json({
      success: true,
      deployment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDeployment,
  getDeploymentStatus,
};