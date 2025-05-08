import express from "express"
import connection from "./connection.js"
import env from "dotenv"

env.config()

const PORT = process.env.PORT

const app = express()

connection().then(() => {
    app.listen(PORT, () => {
        console.log(`server running at http://localhost:${PORT}`)
    })
}).catch((err) => console.log(err))