const multer = require("multer");
const { BadRequestError } = require("../errors/Errors");

// const routePathForSavingFile = [
//   // {
//   //   path: "/auth/register",
//   //   folder: "profile/"
//   // },
//   {
//     path: "/movie/new",
//     folder: "movie"
//   }
// ];

const storage = multer.diskStorage({
  // Save in database
  destination: (req, file, cb) => {
    // routePathForSavingFile.find((route) => {
    //   if (req.originalUrl === route.path) {
    //     cb(null, `uploads/${route.folder}`);
    //   } else {
    //     cb(null, `uploads/`);
    //   }
    // });
    //
    // const findRoute = routePathForSavingFile.find((route) => {
    //   const findRoute = route.path === req.originalUrl;
    //   routePathForSavingFile.map((route) => {
    //     if (findRoute.path === route.path) {
    //       cb(null, `uploads/${route.folder}`);
    //     } else {
    //       cb(null, `uploads/`);
    //     }
    //   });
    // });

    // Working Good Now To Doing With Map Array

    if (req.originalUrl === "/auth/register") {
      cb(null, "uploads/profile/");
    } else if (req.originalUrl.includes("/movie")) {
      cb(null, "uploads/movie");
    } else {
      cb(null, "uploads/");
    }
  },

  // Filename
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
  },
});

exports.upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1 Gb
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new BadRequestError(`Only image files are allowed!`));
    }
    cb(null, true);
  },
});
