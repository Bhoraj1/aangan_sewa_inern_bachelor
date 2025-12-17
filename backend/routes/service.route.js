import express from "express";
import multer from "multer";
import { addService } from "../controllers/service.controller.js";
import { serviceImgUpload } from "../utils/multerHandler.js";

const serviceRouter = express.Router();

serviceRouter.post("/add-service", serviceImgUpload.single('serviceimg'), addService)

export default serviceRouter;