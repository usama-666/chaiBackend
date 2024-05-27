import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import jwt from "jsonwebtoken"

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token =
      req.cookie?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "")
    if (!token) throw new ApiError(401, "unAuthorized Request")
    console.log("Access token sercet from env ::", process.env.ACCESS_JWT_TOKEN)
    const decodedToken = await jwt.verify(token, process.env.ACCESS_JWT_TOKEN)
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    )
    if (!user) {
      //Todo::
      throw new ApiError(401, "Invalid Access Token")
    }
    req.user = user

    next()
  } catch (error) {
    throw new ApiError(401, error?.message, "Invalid acesss Token")
  }
})
