// Thao tac voi database

import { ITour } from "../interfaces";
import tourModel from "../models/tour.model";
import APIFeatures from "../utils";

export default class TourService {
  constructor() { };

  static async getAllTours(query :any) {
    const features = new APIFeatures(tourModel.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    return await features.query;
  }

  static async createTour(data: ITour) {
      return await tourModel.create(data);
  }

  static async getTourById(id: string) {
   const tour = await  tourModel.findById(id)
    return {
      msg: "getTourById",
      data :tour,
    }
  }

  static async updateTourById(id: string, tour: ITour) {
    await tourModel.findByIdAndUpdate(id,tour)
    return {
      msg: "updateTourById heh"
    }
  }

  static async deleteTourById(id: string) {
    await tourModel.findByIdAndDelete(id)
    return {
        msg: "deleteTourById"
    }
  }

}