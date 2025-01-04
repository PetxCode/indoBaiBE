import multer from "multer";
import path from "node:path";
import fs from "node:fs";

let filePathMedia = path.join(__dirname, "./uploads/media");

let filePath = path.join(__dirname, "./uploads");
let filePathCoverImage = path.join(__dirname, "./uploads/coverImages");
let filePathMap = path.join(__dirname, "./uploads/maps");
let filePathDocuments = path.join(__dirname, "./uploads/documents");
let filePathPhotos = path.join(__dirname, "./uploads/photos");
let filePathOthers = path.join(__dirname, "./uploads/others");

const createFolder = (filePathFolder: any) => {
  console.log("Read Here");
  if (!fs.existsSync(filePathFolder)) {
    fs.mkdir(filePathFolder, () => {
      console.log("folder just created");
    });
  } else {
    console.log("folder exist...");
  }
};
createFolder(filePathMedia);

createFolder(filePathOthers);

createFolder(filePath);
createFolder(filePathCoverImage);
createFolder(filePathMap);
createFolder(filePathDocuments);
createFolder(filePathPhotos);

console.log("Read Here");

export const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = "./uploads/media";

      // if (file.fieldname === "gallaryImage") folder = "./uploads/photos";

      // if (file.fieldname === "coverImage") folder = "./uploads/coverImages";
      // else if (file.fieldname === "map") folder = "./uploads/maps";
      // else if (file.fieldname === "brochure") folder = "./uploads/documents";
      // else if (file.fieldname === "gallaryImage") folder = "./uploads/photos";
      if (file.fieldname === "coverImage") folder = filePathMedia;
      else if (file.fieldname === "map") folder = filePathMedia;
      else if (file.fieldname === "brochure") folder = filePathMedia;
      else if (file.fieldname === "gallaryImage") folder = filePathMedia;

      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    },
  }),
});

export const avatar = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let folder = "./uploads/others";

      if (file.fieldname === "gallaryImage") folder = "./uploads/photos";

      cb(null, folder);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    },
  }),
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, filePathMedia);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg");
  },
});

export const uploadAvatar = multer({ storage: storage }).single("avatar");
