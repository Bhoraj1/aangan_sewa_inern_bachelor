import express from "express";
import { addInquiry, getInquiry } from "../controllers/site.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const siteRouter = express.Router();

siteRouter.post("/add-inquiry", addInquiry);
siteRouter.get("/inquiries", isLogin, getInquiry);

export default siteRouter;