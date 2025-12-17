import express from "express";
import dotenv from "dotenv";
import db from "./config/db.connect.js";
import branchRouter from "./routes/branch.routes.js";
import serviceRouter from "./routes/service.route.js";
dotenv.config();

const app = express();
app.use(express.json());


app.use("/api/branch",branchRouter)
app.use("/api/service",serviceRouter)

const port = process.env.PORT || 4000;
try {
  await db.connect();
  console.log("MySQL Connected Successfully!");
} catch (err) {
  console.error("MySQL Connection Failed:", err.message);
}
// Arrow Functioin is used here.
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
