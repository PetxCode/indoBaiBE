import { Router } from "express";
import {
  createProperty,
  deleteProperty,
  getAgentProperties,
  getAllProperties,
  getAllPropertiesByCommuninty,
  getOneProperties,
  searchAllPropertiesByCommuninty,
  updatePropertyPrice,
} from "../controller/propertyController";
import multer from "multer";
import { upload } from "../utils/multer";

let coverImage = multer().single("coverImage");

const router: any = Router();

router
  .route("/read-all-property-community/")
  .post(getAllPropertiesByCommuninty);
router
  .route("/read-all-property-search/")
  .post(searchAllPropertiesByCommuninty);

router.route("/read-all-property/").get(getAllProperties);
router.route("/read-my-property/:userID").get(getAgentProperties);
router.route("/read-one-property/:propertyID").get(getOneProperties);
router
  .route("/update-my-property/:userID/:propertyID")
  .patch(updatePropertyPrice);
router.route("/delete-my-property/:userID/:propertyID").delete(deleteProperty);

router.route("/create-property/:userID").post(
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "map", maxCount: 1 },
    { name: "brochure", maxCount: 1 },
    { name: "gallaryImage", maxCount: 4 },
  ]),
  createProperty
);

export default router;
