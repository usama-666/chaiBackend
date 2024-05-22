import mongoose, { Schema } from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    wathcHistory: {
      type: Schema.Types.ObjectId,
      ref: "Video",
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary URL
      required: true,
    },
    coverImage: {
      type: String, //cloudinary URL
    },
    password: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
)

userSchema.pre("save", async function (next) {
  //now to avoid hashing every time when storing data in model we use following check
  if (!this.isModified("password")) return next()
  this.password = bcrypt.hash(this.password, 10)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      userName: this.userName,
      email: this.email,
      fullName: this.fullName,
    },
    process.env.ACESS_JWT_TOKEN,
    {
      expiresIn: process.env.ACCESS_JWT_TOKEN_EXPIRY,
    }
  )
}
userSchema.methods.generateRefreshToken = function () {
  this.refreshToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_JWT_TOKEN,
    {
      expiresIn: process.env.REFRESH_JWT_TOKEN_EXPIRY,
    }
  )
}

export const User = mongoose.model("User", userSchema)
