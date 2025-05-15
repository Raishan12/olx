import adSchema from "../models/ad.model.js";
import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    console.log("signup function");
    console.log(req.body);

    console.log("add user in controller");
    const { username, email } = req.body;

    if (!(username && email)) {
      return res.status(404).send({ error: "Email or Username is incorrect" });
    }

    const userExist = await userSchema.findOne({ email });

    if (userExist) {
      return res.status(200).send({ success: "succesfully loggedin", id: userExist._id });
    }

    const data = await userSchema.create({ username, email });
    res.status(201).send({ id: data._id });
  } catch (error) {
    console.log({ errorMessage: error });
    res.status(500).send(error);
  }
};

export const uploadads = async (req, res) => {
  try {
    console.log("uploadads fn");
    console.log(req.body);

    const { user_id } = req.params;

    let photos = [];
    if (req.files && req.files.length > 0) {
      req.files.forEach((file) => {
        photos.push(file.filename);
      });
    }

    const category = req.body.category;
    const vehicleName = category === "bikes" ? req.body.bikeName : req.body.carName;

    const content = {
      photos,
      name: vehicleName,
      brand: req.body.brand,
      model: req.body.year,
      fuel: req.body.fuel,
      gear: req.body.transmission,
      owner: req.body.noOfOwners,
      adtitle: req.body.adTitle,
      description: req.body.description,
      price: req.body.price,
      kilometers: req.body.kmDriven,
      category: req.body.category,
      location: {
        state: req.body.location.state,
        city: req.body.location.city,
        neighbourhood: req.body.location.neighborhood
      },
      user_id,
      email: req.body.email,
    };

    // Validate required fields
    if (
      !content.name ||
      !content.brand ||
      !content.model ||
      !content.fuel ||
      !content.gear ||
      !content.owner ||
      !content.adtitle ||
      !content.description ||
      !content.price ||
      !content.kilometers ||
      !content.location.state ||
      !content.location.city ||
      !content.location.neighbourhood
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const data = await adSchema.create(content);

    res.status(201).json({ message: "Posted successfully", data });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Upload failed", error });
  }
};

export const getads = async (req, res) => {
  try {
    const data = await adSchema
      .find()
      .sort({ date: -1 })
      .populate("user_id", "_id username profilepicture");
    if (!data) {
      return res.status(404).send("Data not found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "upload failed", error });
  }
};

export const getproduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const data = await adSchema.findById({ _id: pid });
    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
    console.log(user_id, product_id)
    const user = await userSchema.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    const product = await adSchema.findById(product_id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const isWishlisted = user.wishlist.includes(product_id);

    if (isWishlisted) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== product_id);
    } else {
      user.wishlist.push(product_id);
    }

    await user.save();

    res.status(200).json({ message: isWishlisted ? "Removed from wishlist" : "Added to wishlist" });
  } catch (error) {
    console.error("Wishlist toggle error:", error);
    res.status(500).json({ message: "Failed to update wishlist", error });
  }
};

export const getWishlist = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await userSchema.findById(user_id).populate("wishlist");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.error("Get wishlist error:", error);
    res.status(500).json({ message: "Failed to fetch wishlist", error });
  }
};