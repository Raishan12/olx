import adSchema from "../models/ad.model.js"
import userSchema from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {
    console.log("signup function");

    console.log(req.body);

    console.log(req.file.filename)
    
    const profilepicture = req.file.filename
    
    console.log("add user in controller");
    const {  username, email, phone, password } = req.body
    if (!(profilepicture && username && email && phone && password)) {
        return res.status(404).send({ error: "please fill all fields" })
    }

    bcrypt.hash(password, 10).then(async (hashedpwd) => {
        console.log(hashedpwd)
        const data = await userSchema.create({ profilepicture, username, email, phone, password: hashedpwd })
        res.status(201).send(data)
    })
  } catch (error) {
    console.log({errorMessage: error})
    res.status(500).send(error)
  }
}



export const uploadads = async(req, res) => {
    try {
        console.log("uploadads fn");
    
        const { title, brand, description, location, price, category } = req.body;
        const { user_id } = req.params
        
        // console.log(req.files)

        let photos = []

        req.files.forEach((file)=>{
          photos.push(file.filename)
        })

        if(photos == []){
          return res.status(400).json({ message: "Missing required fields" });
        }
  
        if (!(title && brand && description && location && price && category)) {
          return res.status(400).json({ message: "Missing required fields" });
        }
    
        const data = await adSchema.create({ title, brand, description, location, category, price, photos, user_id})
  
        res.status(201).json({ message: "Posted successfully", data });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "upload failed", error });
      }
}

export const getads = async(req, res) => {
  try {
    const data = await adSchema.find()
    .populate('user_id', '_id username profilepicture')
    if(!data){
      return res.status(404).send("Data not found")
    }
    res.status(200).send(data)

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "upload failed", error });
  }
}