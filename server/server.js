const express = require("express");
const connectDB = require("./config.js");
const cors = require("cors");
const prescriptionRoutes = require("./routes/prescription.js");

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/api/prescription", prescriptionRoutes);

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
