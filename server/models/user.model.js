import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    profilepicture:{type:String, default: null},
    username:{type:String, required:true},
    email:{type:String, required:true},
    phone:{type:String, default: null},
    password:{type:String, deafult: null},
    wishlist:{type: [{type: mongoose.Schema.Types.ObjectId, ref: "Ad"}], default: []},
    otp:{type:Number, default:null}
})

export default mongoose.model.Users || mongoose.model("User",userSchema)