import { Request, Response, NextFunction } from "express";
import TourService from "../services";
import { SuccessResponse ,CREATED } from "../middleware/responses.middeware";

class TourController {
  getAllTours = async (req:Request, res:Request, next :NextFunction) => {
    new SuccessResponse({
      message: "getAllTours success!",
      metadata: await TourService.getAllTours(req.query)
    }).send(res as any)
  }

  createTour = async (req: Request, res: Response, next: NextFunction) => {
    new CREATED({
      message: "createTour success!",
      metadata: await TourService.createTour(req.body)
    }).send(res)
  }

  getTourById = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "getTourById success!",
      metadata: await TourService.getTourById(req.params.id)
    }).send(res)
  };

  updateTourById = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "updateTourById success!",
      metadata: await TourService.updateTourById(req.params.id, req.body)
    }).send(res)
  }

  deleteTourById = async (req: Request, res: Response, next: NextFunction) => {
    new SuccessResponse({
      message: "deleteTourById success!",
      metadata: await TourService.deleteTourById(req.params.id)
    }).send(res)
  }

}

export default new TourController();