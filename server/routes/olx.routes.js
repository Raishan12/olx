import express from "express"
import upload from "../multer/multer.config.js"
import auth from "../middleware/auth.js"
import { getads, signup, uploadads } from "../controller/olx.controller.js"

const olxRoutes = express.Router()

olxRoutes.post("/uploadads/:user_id", upload.array('photos'),uploadads)
olxRoutes.post("/signup", upload.single('profilepicture'),signup)
olxRoutes.get("/getads", getads)


export default olxRoutes