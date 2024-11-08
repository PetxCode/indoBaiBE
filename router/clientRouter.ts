import { Router } from "express";
import {
  clientInterestOnProperty,
  clientPropertyInterest,
  createClientPropertyInterest,
} from "../controller/clientController";

const router: any = Router();

router
  .route("/client-interest-property/:propertyID")
  .post(createClientPropertyInterest);

router.route("/user-client-interest/:userID").get(clientPropertyInterest);
router
  .route("/property-client-interest/:propertyID")
  .get(clientInterestOnProperty);

export default router;
