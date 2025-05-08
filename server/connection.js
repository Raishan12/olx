import mongoose from "mongoose"

export default async function connection() {
    try {
        console.log("asd")
        const db = await mongoose.connect("mongodb://localhost:27017/olxdb")
        console.log("Database Connected")
        return db   
    } catch (error) {
        console.log(error)
    }
}