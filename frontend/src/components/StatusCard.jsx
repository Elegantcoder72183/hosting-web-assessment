import React from "react";

const StatusCard = ({ deployment }) => {
  const getStatusColor = () => {
    switch (deployment?.status) {
      case "Pending":
        return "bg-yellow-500";

      case "Running":
        return "bg-blue-500";

      case "Completed":
        return "bg-green-500";

      case "Failed":
        return "bg-red-500";

      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 mt-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-5">Deployment Status</h2>

      <div className="space-y-3">
        <p>
          <span className="font-semibold">Client:</span>{" "}
          {deployment?.clientName}
        </p>

        <p>
          <span className="font-semibold">Domain:</span> {deployment?.domain}
        </p>

        <p>
          <span className="font-semibold">Image:</span> {deployment?.image}
        </p>

        <div className="flex items-center gap-3 pt-2">
          <div className={`w-4 h-4 rounded-full ${getStatusColor()}`}></div>

          <span className="font-bold text-lg">{deployment?.status}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
