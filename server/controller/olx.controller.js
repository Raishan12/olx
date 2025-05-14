import adSchema from "../models/ad.model.js"
import userSchema from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {
    console.log("signup function");

    console.log(req.body);

    console.log("add user in controller");
    const {  username, email } = req.body


    if (!(username && email)) {
      return res.status(404).send({ error: "Email or Username is incorrect" })
  }

    const userExist = await userSchema.findOne({email})

    if(userExist) {
      return res.status(200).send({ success: "succesfully loggedin", id:userExist._id })

    }

    const data = await userSchema.create({ username, email })
    res.status(201).send({id:data._id})

  } catch (error) {
    console.log({errorMessage: error})
    res.status(500).send(error)
  }
}



export const uploadads = async(req, res) => {
    try {
        console.log("uploadads fn");
        console.log(req.body)
    
        const { user_id } = req.params

        let photos = []

        req.files.forEach((file)=>{
          photos.push(file.filename)
        })

        const content = { 
          photos,
          name: req.body.carName,
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
          user_id
        }

        if(photos == []){
          return res.status(400).json({ message: "Missing required fields" });
        }

    
        const data = await adSchema.create({ ...content, photos })
  
        res.status(201).json({ message: "Posted successfully", data });
      } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ message: "upload failed", error });
      }
}

export const getads = async(req, res) => {
  try {
    const data = await adSchema.find().sort({date:-1})
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

export const getproduct = async (req, res) => {
  try {
    const { pid } = req.params

    const data = await adSchema.findById({_id:pid})
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send(error)
  }
}