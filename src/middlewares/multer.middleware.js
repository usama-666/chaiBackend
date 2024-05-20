import multer from "multer"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp")
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9)

    //Method - 1  :: Analyzing the frontend file data
    console.log("File From Frontend :: data :: ", file)
    cb(null, file.fieldname + "-" + uniqueSuffix)
    //Method -2 :: Just returing the orignal file naeme and then saved
    cb(null, file.originalname)
  },
})

export const upload = multer({ storage })
// export const upload = multer({ storage: storage })
