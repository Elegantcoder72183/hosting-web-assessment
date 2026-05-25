import { useState } from "react";

const DeploymentForm = ({ onDeploy, loading }) => {
  const [formData, setFormData] = useState({
    clientName: "",
    domain: "",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onDeploy(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl rounded-2xl p-6 border border-gray-100"
    >
      <h2 className="text-2xl font-bold mb-6">Client Onboarding</h2>

      <div className="space-y-4">
        <input
          type="text"
          name="clientName"
          placeholder="Client Name"
          value={formData.clientName}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl outline-none"
          required
        />

        <input
          type="text"
          name="domain"
          placeholder="test.platform.com"
          value={formData.domain}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl outline-none"
          required
        />

        <input
          type="text"
          name="image"
          placeholder="nginx:latest"
          value={formData.image}
          onChange={handleChange}
          className="w-full border p-3 rounded-xl outline-none"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded-xl hover:opacity-90 transition"
        >
          {loading ? "Deploying..." : "Deploy"}
        </button>
      </div>
    </form>
  );
};

export default DeploymentForm;
