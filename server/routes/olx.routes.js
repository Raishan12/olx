import express from "express"
import upload from "../multer/multer.config.js"
import auth from "../middleware/auth.js"
import { getads, getproduct, signup, uploadads } from "../controller/olx.controller.js"

const olxRoutes = express.Router()

olxRoutes.post("/uploadads/:user_id", upload.array('file'),uploadads)
olxRoutes.post("/signup", signup)
olxRoutes.get("/getads", getads)
olxRoutes.get("/getproduct/:pid", getproduct)


export default olxRoutes