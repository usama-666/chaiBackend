const asyncHandler = (requestHandler) => {
  ;(req, res, next) => {
    Promise.resolve(() => {
      requestHandler(req, res, next)
    }).catch((err) => {
      next(err)
    })
  }
}

export { asyncHandler }

// const asyncHandler = (func) ={ () => {}}

// const asyncHandle = (func) => async (req, res, next) => {
//   try {
//     await func(err, req, res, next)
//   } catch (error) {
//     res.status(err.code || 500).json({
//       sucess: false,
//       message: err.message,
//     })
//   }
// }

// export { asyncHandler }
