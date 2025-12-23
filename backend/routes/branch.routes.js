import express from "express";
import {
  addBranch,
  addDistrict,
  addProvience,
  getAllBranches,
  getAllDistricts,
  getAllProviences,
} from "../controllers/branch.controller.js";
import { isLogin } from "../middlewares/isLogin.js";
import { authorizeRoles } from "./../middlewares/isAuth.js";
const branchRouter = express.Router();

branchRouter.post(
  "/add-provience",
  isLogin,
  authorizeRoles("admin"),
  addProvience
);
branchRouter.get("/get-proviences", getAllProviences);

branchRouter.post(
  "/add-district",
  isLogin,
  authorizeRoles("admin"),
  addDistrict
);
branchRouter.get("/get-districts", getAllDistricts);

branchRouter.post("/add-branch", addBranch);
branchRouter.get("/get-branch", getAllBranches);

export default branchRouter;
