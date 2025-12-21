import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/db.connect.js";
import branchRouter from "./routes/branch.routes.js";
import serviceRouter from "./routes/service.route.js";
import authRouter from "./routes/auth.routes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/branch", branchRouter);
app.use("/api/service", serviceRouter);

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
