import { Router } from "express";
import tourController from "../../controllers/tour.controller";
import catchAsync from "../../middleware/catchAsync.middleware";

const router = Router();

router
  .route("/")
  .get(catchAsync(tourController.getAllTours))
  .post(catchAsync(tourController.createTour));
router
  .route("/:id")
  .get(catchAsync(tourController.getTourById))
  .patch(catchAsync(tourController.updateTourById))
  .delete((tourController.deleteTourById));

export default router;