const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

require("./workers/deploymentWorker.js");

const connectDB = require("./config/db.js");
const deploymentRoutes = require("./routes/deploymentRoute.js");

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", deploymentRoutes);

app.get("/", (req, res) => {
  res.send("Backend Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});