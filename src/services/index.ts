// Thao tac voi database

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

  static async createTour(data: any) {
      return await tourModel.create(data);
  }

  static async getTourById(id: string) {
    return {
      msg: "getTourById"
    }
  }

  static async updateTourById(id: string, tour: any) {
    return {
      msg: "updateTourById"
    }
  }

  static async deleteTourById(id: string) {
    return {
      msg: "deleteTourById"
    }
  }

}