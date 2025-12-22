import express from "express";
import {
  authLogin,
  signout,
  addBranchManager,
  getBranchManagers,
  deleteBranchManager,
} from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const authRouter = express.Router();

authRouter.post("/login", authLogin);
authRouter.post("/signout", signout);
authRouter.post("/add-branch-manager", isLogin, isAdmin, addBranchManager);
authRouter.get("/branch-managers", isLogin, isAdmin, getBranchManagers);
authRouter.delete("/delete-branch-manager/:user_id", isLogin, isAdmin, deleteBranchManager);

export default authRouter;
