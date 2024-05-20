import { asyncHandler } from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Ok Bhais",
  })
})

const loginUser = async (req, res) => {
  res.status(200).json({
    sucess: true,
    message: "Logiend User requesst sucess",
  })
}
export { registerUser, loginUser }
