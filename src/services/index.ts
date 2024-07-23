// Thao tac voi database

export default class TourService {
  constructor() { };

  static async getAllTuours() {
    return {
      msg: "createTour"
    }
  }

  static async createTour(data: any) {
    return {
      msg: "createTour"
    }
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