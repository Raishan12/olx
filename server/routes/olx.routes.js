import express from "express";
import upload from "../multer/multer.config.js";
import auth from "../middleware/auth.js";
import { getads, getproduct, signup, uploadads, toggleWishlist, getWishlist, makeOffer, getUser, updateProfile, getUserAds } from "../controller/olx.controller.js";

const olxRoutes = express.Router();

olxRoutes.post("/uploadads/:user_id", upload.array("file"), uploadads);
olxRoutes.post("/signup", signup);
olxRoutes.get("/getads", getads);
olxRoutes.get("/getproduct/:pid", getproduct);
olxRoutes.post("/toggleWishlist/:user_id/:product_id", toggleWishlist);
olxRoutes.get("/getWishlist/:user_id", getWishlist);
olxRoutes.post("/makeOffer", makeOffer);
olxRoutes.get("/getUser/:user_id", getUser);
olxRoutes.put("/updateProfile/:user_id", updateProfile);
olxRoutes.get("/getUserAds/:user_id", getUserAds);

export default olxRoutes;