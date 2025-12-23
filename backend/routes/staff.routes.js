import express from "express";
import { addStaff } from "../controllers/staff.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const staffRouter = express.Router();
staffRouter.post(
  "/add-staff",
  isLogin,
  authorizeRoles("branch_manager"),
  addStaff
);

export default staffRouter;
