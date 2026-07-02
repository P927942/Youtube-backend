import multer from "multer";
//using disk storage
//cb-callback

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, ".lpublic/temp");
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname);
    //can also name it different that original name eg-Date.now() + "-" + file.originalname
  },
});

export const upload = multer({ storage: storage });

/* later router.post(
    "/register",
    upload.single("avatar"),
    registerUser
);
*/
