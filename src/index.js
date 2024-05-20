import dotenv from "dotenv"
import connectDB from "./db/index.js"
import { app } from "./app.js"

dotenv.config({
  path: "./.env",
})

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 8000, () => {
      console.log(`⚙️ Server is running at port : ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log("Error MongoDB Connection failed :: index.js :: ", error)
  })

//Connecting DB index.js
/*
;(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    app.on("error", (error) => {
      console.log("ERROR Occured :: index.js", error)
    })
  } catch (error) {
    console.log("error :: catch ", error)
    throw error
  }
})()
*/
