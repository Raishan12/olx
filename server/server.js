import express from "express"
import connection from "./connection.js"
import olxRoutes from "./routes/olx.routes.js"
import cors from "cors"
import env from "dotenv"
import path from 'path'
import url from "url"

env.config()

const PORT = process.env.PORT

const app = express()

const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/images",express.static(path.join(__dirname, "images")))
console.log(path.join(__dirname, "images"))
app.use(express.json({limit:"100mb"}))
app.use(cors())



app.use("/api/olx", olxRoutes)




connection().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`)
    })
}).catch((error) => console.log(error))