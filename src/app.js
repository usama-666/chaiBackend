import express, { urlencoded } from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

//Utilizing all necessary middlewares

//cors to handle client url
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
)
//we are getting data from multiples methods so we need that in json format
app.use(express.json({ limit: "20kb" }))
//also data we are getting from URL include some  special urlEncoded Character
app.use(express.urlencoded({ extended: true, limit: "20kb" }))

//for uploading files, images in server we need to add the middleware to use a public forlder
app.use(express.static("public"))

export { app }
