import adSchema from "../models/ad.model.js";
import userSchema from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  secure: false,
  auth: {
    user: "7eb1543be06e9f",
    pass: "0ba7cb7047c660",
  },
});

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
      return res.status(200).send({ success: "successfully logged in", id: userExist._id });
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
    let nameField = '';
    if (category === 'cars') {
      nameField = req.body.carName;
    } else if (category === 'bikes') {
      nameField = req.body.bikeName;
    } else if (category === 'mobiles') {
      nameField = req.body.model;
    }

    const content = {
      photos,
      name: nameField,
      brand: req.body.brand,
      model: category === 'cars' ? req.body.year : req.body.model || null,
      fuel: req.body.fuel || null,
      gear: req.body.transmission || null,
      owner: req.body.owner || null,
      adtitle: req.body.adTitle,
      description: req.body.description,
      price: parseFloat(req.body.price),
      kilometers: req.body.kmDriven || null,
      category,
      location: {
        state: req.body.location.state,
        city: req.body.location.city,
        neighbourhood: req.body.location.neighborhood
      },
      user_id,
      email: req.body.email,
    };

    if (
      !photos.length ||
      !content.name ||
      !content.brand ||
      !content.adtitle ||
      !content.description ||
      !content.price ||
      !content.category ||
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

// Other controller functions remain unchanged
export const getads = async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const data = await adSchema
      .find(query)
      .sort({ date: -1 })
      .populate("user_id", "_id username profilepicture");
    if (!data || data.length === 0) {
      return res.status(404).send("Data not found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Get ads error:", error);
    res.status(500).json({ message: "Failed to fetch ads", error });
  }
};

export const getproduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const data = await adSchema
      .findById(pid)
      .populate("user_id", "username createdAt");
    if (!data) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).send(error);
  }
};

export const toggleWishlist = async (req, res) => {
  try {
    const { user_id, product_id } = req.params;
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

export const makeOffer = async (req, res) => {
  try {
    const { userId, productId, offerPrice } = req.body;
    const buyer = await userSchema.findById(userId);
    if (!buyer) {
      return res.status(404).json({ message: "Buyer not found" });
    }
    const product = await adSchema.findById(productId).populate("user_id", "username email");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const seller = product.user_id;
    if (!seller) {
      return res.status(404).json({ message: "Seller not found" });
    }
    const productDetails = `
      Product Title: ${product.adtitle}
      Price: ₹${product.price.toLocaleString()}
      Offer Price: ₹${offerPrice.toLocaleString()}
      Category: ${product.category || "N/A"}
      Brand: ${product.brand || "N/A"}
      Model: ${product.model || "N/A"}
      Description: ${product.description || "N/A"}
      Location: ${product.location.neighbourhood}, ${product.location.city}, ${product.location.state}
    `;
    const sellerToBuyerMail = {
      from: `"${seller.username}" <${seller.email}>`,
      to: buyer.email,
      subject: `Offer Received for ${product.adtitle}`,
      text: `
        Hello ${buyer.username},
        You have made an offer for the following product:
        ${productDetails}
        Seller Details:
        Username: ${seller.username}
        Email: ${seller.email}
        The seller will review your offer and get back to you soon.
        Regards,
        OLX Team
      `,
    };
    const buyerToSellerMail = {
      from: `"${buyer.username}" <${buyer.email}>`,
      to: seller.email,
      subject: `New Offer for ${product.adtitle}`,
      text: `
        Hello ${seller.username},
        You have received a new offer for your product:
        ${productDetails}
        Buyer Details:
        Username: ${buyer.username}
        Email: ${buyer.email}
        Please review the offer and respond to the buyer.
        Regards,
        OLX Team
      `,
    };
    await Promise.all([
      transporter.sendMail(sellerToBuyerMail),
      transporter.sendMail(buyerToSellerMail),
    ]);
    res.status(200).json({ message: "Offer submitted successfully and emails sent" });
  } catch (error) {
    console.error("Make offer error:", error);
    res.status(500).json({ message: "Failed to submit offer", error });
  }
};

export const getUser = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await userSchema.findById(user_id).select('-password -otp');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ message: "Failed to fetch user", error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { username, phoneNumber, about } = req.body;
    const user = await userSchema.findById(user_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (username) user.username = username;
    if (phoneNumber) user.phone = phoneNumber;
    if (about) user.about = about;
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Failed to update profile", error });
  }
};

export const getUserAds = async (req, res) => {
  try {
    const { user_id } = req.params;
    const data = await adSchema
      .find({ user_id })
      .sort({ date: -1 })
      .populate("user_id", "_id username profilepicture");
    if (!data || data.length === 0) {
      return res.status(404).send("No ads found");
    }
    res.status(200).send(data);
  } catch (error) {
    console.error("Get user ads error:", error);
    res.status(500).json({ message: "Failed to fetch ads", error });
  }
};