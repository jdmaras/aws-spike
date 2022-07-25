const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const s3Uploadv2 = require('./s3Service');

const app = express();



//install multer and set it up
const multer = require("multer");
//install uuid which allows for unique identifier for file names
const uuid = require("uuid").v4

//pass in dest is 'destination' on your computer
//upload is the middleware that handles uploading the file to that folder
//-------------------------------- uncomment below for single
// const upload = multer({ dest: "uploads/" })

//setting up the express to listen on /upload 
//when the frontend sends the file, the name of the field the file is attached to, you can name it whatever
// .single is for single files
//---------------------- uncomment below for single upload
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ status: "success" });
// });

//custom filename upload

//multer will give it a unique name, but doing it this way will allow the original file name to be on the end of it
//diskStorage is the method for saving to memory


// const storage = multer.diskStorage({
//   //cb = "callback" - passing in request, file, and the callback
//   destination: (req, file, cb) => {
//     cb(null,"uploads/");
//   },
//   filename: (req, file, cb) => {
//           //destructure it and have it equal the key of file
//         const {originalname} = file;
//         //uuid is the unique identifier
//       cb(null, `${uuid()}-${originalname}`)
//   },
// })

//store the file in memory and then you pass it into 'upload' down below
const storage = multer.memoryStorage()


// FILE FILTER - WHAT FILE TYPES DO YOU WANT TO ALLOW
// mimetype is how you find the filetype with parent type / what the file type is
// const fileFilter = (req, file, cb) => {
//   if(file.mimetype.split("/")[0] == 'image'){
//     cb(null,true);
//   } else {
//     cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false)
//   }
// }
// ----- ^^^^^ This is written out for 'image' files and not video files





// you would pass in fileFilter after storage if you wanted to filter by certain file types
// uuid-originalname
// pass in 'storage'                limits this makes it whatever kb limit you set as / and only 1 file
const upload = multer({ storage, limits: {fileSize: 1000000000, files: 1} });
app.post("/upload", upload.array("file"), async (req, res) => {
  console.log('this is the post endpoint', req.files[0])
  try{
    const file = req.files[0]
    const result = await s3Uploadv2(file);
  res.json({ status: "success", result });
}
catch(error) {
  console.log(error)
  res.sendStatus(500);
}
});

//this is middleware /  instanceof = is this a multer error? 
// app.use((error, req, res, next) => {
//       //
//   if(error instanceof multer.MulterError){
//     if(error.code === "LIMIT_FILE_SIZE"){
//       return res.status(400).json({
//         message: "file size is too large, big dawg"
//       })
//     }
//     if(error.code === "LIMIT_FILE_COUNT"){
//       return res.status(400).json({
//         message: "file limit reached, big dawg"
//       })
//     }
    // if(error.code === "LIMIT_UNEXPECTED_FILE"){
    //   return res.status(400).json({
    //     message: "file must be a video, big dawg"
    //   })
    // }
//   }
// })





const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
