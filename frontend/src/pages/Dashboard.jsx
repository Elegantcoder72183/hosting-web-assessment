import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import DeploymentForm from "../components/DeploymentForm";
import StatusCard from "../components/StatusCard";
import Loader from "../components/Loader";

import { createDeployment, getDeploymentStatus } from "../api/deploymentApi";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);

  const [deploymentId, setDeploymentId] = useState(null);

  const [deployment, setDeployment] = useState(null);

  // Create Deployment
  const handleDeploy = async (data) => {
    try {
      setLoading(true);

      const response = await createDeployment(data);

      const deploymentData = response.data.deployment;

      setDeploymentId(deploymentData._id);

      setDeployment(deploymentData);

      toast.success("Deployment Started");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Deployment Failed");
    } finally {
      setLoading(false);
    }
  };

  // Polling
  useEffect(() => {
    if (!deploymentId) return;

    const interval = setInterval(async () => {
      try {
        const response = await getDeploymentStatus(deploymentId);

        const updatedDeployment = response.data.deployment;

        setDeployment(updatedDeployment);

        // Stop polling when completed
        if (
          updatedDeployment.status === "Completed" ||
          updatedDeployment.status === "Failed"
        ) {
          clearInterval(interval);
        }
      } catch (error) {
        console.log(error);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [deploymentId]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Hosting Platform Control Panel
        </h1>

        <DeploymentForm onDeploy={handleDeploy} loading={loading} />

        {loading && <Loader />}

        {deployment && <StatusCard deployment={deployment} />}
      </div>
    </div>
  );
};

export default Dashboard;
