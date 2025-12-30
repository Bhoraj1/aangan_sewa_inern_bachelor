import express from "express";
import {
  addService,
  deleteService,
  getAllServices,
} from "../controllers/service.controller.js";
import { serviceImgUpload } from "../utils/multerHandler.js";

const serviceRouter = express.Router();

serviceRouter.post(
  "/add-service",
  serviceImgUpload.single("serviceimg"),
  addService
);
serviceRouter.delete("/delete-service/:service_id", deleteService);
serviceRouter.get("/get-all-services", getAllServices);

export default serviceRouter;
