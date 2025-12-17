import express from "express";
import {
  addBranch,
  addDistrict,
  addProvience,
  getAllBranches,
  getAllDistricts,
  getAllProviences,
} from "../controllers/branch.controller.js";
const branchRouter = express.Router();

branchRouter.post("/add-provience", addProvience);
branchRouter.get("/get-proviences", getAllProviences);

branchRouter.post("/add-district", addDistrict);
branchRouter.get("/get-districts", getAllDistricts);

branchRouter.post("/add-branch", addBranch);
branchRouter.get("/get-branch", getAllBranches);

export default branchRouter;
