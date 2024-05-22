import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req, res) => {
  // Now goal is to register user
  // steps will be

  /*
   get data from frontend (PostMan)

   Data Validation (
    check for required fields 
    file validation (Images, cover photo)
   )

   check user already exist
   create User
   return response to frontend

*/

  const { userName, email, fullName, password } = req.body
  // console.log(req.body)
  //user  validation
  // console.log(userName, email, fullName, password)
  if (
    [userName, email, fullName, password].some((fields) => {
      fields === " "
    })
  ) {
    throw new ApiError(400, "All  fields are required")
  }

  //password hashing

  //file validation

  const avatarLocalPath = req.files?.avatar[0]?.path
  const coverImageLocalPath = req.files?.coverImage[0]?.path
  console.log("Local File paths :: ", avatarLocalPath, coverImageLocalPath)

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar is Required")
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath)
  const coverImage = await uploadOnCloudinary(coverImageLocalPath)

  //check if user already exist
  const userExisted = await User.findOne({ email, userName })
  if (userExisted) {
    throw new ApiError(400, "UserName and  Email  already Exist")
  }
  console.log("User Existed :: ", userExisted)

  const user = await User.create({
    userName,
    fullName,
    email,
    password,
    avatar: avatar.url,
    coverImage: coverImage.url || " ",
  })

  console.log("User data :: ", user)
  const userCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  )

  console.log("User Created :: ", userCreated)
  if (userCreated) {
    return res
      .status(200)
      .json(new ApiResponse(200, userCreated, "User Created Successfully"))
  }
  // res.status(200).json({
  //   message: "Ok Bhais",
  // })
})

const loginUser = async (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "Logiend User requesst sucess",
  })
}
export { registerUser, loginUser }
