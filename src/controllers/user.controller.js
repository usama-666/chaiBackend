import { asyncHandler } from "../utils/asyncHandler.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId)
    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()
    console.log(accessToken, " -::::-", refreshToken)

    user.refresToken = refreshToken

    await user.save({ validateBeforeSave: false })

    return { accessToken, refreshToken }
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access and refresh tokens"
    )
  }
}

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

const loginUser = asyncHandler(async (req, res) => {
  //tdoos
  /*
get data from frontend

validation check if user exists
password matched
generate acess and refresh tokens
send token in using cookies to frontend


*/

  const { email, userName, password } = req.body

  // validation
  if (!email && !userName && !password) {
    throw new ApiError(402, "email  or username and password is required")
  }

  const user = await User.findOne({
    $or: [{ userName }, { email }],
  }).select("-password -refreshToken")
  console.log("User  :: ", user)

  if (!user) {
    throw new ApiError(404, "user does not exist")
  }
  const isPasswordValid = await user.isPasswwordCorrect(password)
  if (!isPasswordValid) {
    throw new ApiError(401, "invalid Credentials")
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  )
  const { accessToken, refreshToken } = generateAccessAndRefreshToken(user._id)

  //cookie Generation

  //option for security
  const options = {
    httpOnly: true,
    secure: true,
  }
  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          refreshToken,
          accessToken,
        },
        "User LoggedIn SuccessFully"
      )
    )
})

const logoutUser = asyncHandler(async (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  )
  const options = {
    httpOnly: true,
    secure: true,
  }

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged Out"))
})
export { registerUser, loginUser, logoutUser }
