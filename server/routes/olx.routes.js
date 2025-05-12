import express from "express"
import { upload } from "multer"
import auth from "../middleware/auth.js"

const olxRoutes = express.Router()

olxRoutes.get("/getads", auth, getads)
olxRoutes.post("/uploadads", upload.array('image'),uploadads)

export default olxRoutes