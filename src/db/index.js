import dotenv from "dotenv"

import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    )
    console.log(`
    MongoDB Connected !!
    DB HOST :${connectionInstance.Connection.name} 
    `)
  } catch (error) {
    console.log("MONGODB Connection Failed :: ", error)
    process.exit(1)
  }
}

export default connectDB
