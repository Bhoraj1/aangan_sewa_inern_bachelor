import express from "express";
import {
  authLogin,
  signout,
  addBranchManager,
  getBranchManagers,
  deleteBranchManager,
} from "../controllers/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "../middlewares/isAuth.js";

const authRouter = express.Router();

  authRouter.post("/login", authLogin);
  authRouter.post("/signout", signout);
  authRouter.post(
    "/add-branch-manager",
    isLogin,
    authorizeRoles("admin"),
    addBranchManager
  );
authRouter.get(
  "/branch-managers",
  isLogin,
  authorizeRoles("admin"),
  getBranchManagers
);
authRouter.delete(
  "/delete-branch-manager/:user_id",
  isLogin,
  authorizeRoles("admin"),
  deleteBranchManager
);

export default authRouter;
