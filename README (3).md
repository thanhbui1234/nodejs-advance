#### Setup Server

- create package.json

```sh
npm init -y
```
- create and test server.js

```sh
node server
```

#### ES6 Modules

- package.json

```json
  "type": "module",
```
#### Source Control

- create .gitignore
- create .env
- create thư mục src
- trong thư mục src tạo các thư mục con: controllers, models, routes, utils, services, dbs, helpers, auth, middlewares, configs, core,...
- tạo file app.js trong thư mục src

#### Install Packages and Setup Install Script


```sh
npm install bcryptjs@2.4.3 concurrently@8.0.1 cookie-parser@1.4.6 dayjs@1.11.7 dotenv@16.0.3 express@4.18.2 express-async-errors@3.1.1 express-validator@7.0.1 http-status-codes@2.2.0 jsonwebtoken@9.0.0 mongoose@7.0.5 morgan@1.10.0 multer@1.4.5-lts.1 nanoid@4.0.2 nodemon@2.0.22 cloudinary@1.37.3 dayjs@1.11.9 datauri@4.1.0 helmet@7.0.0 express-rate-limit@6.8.0 express-mongo-sanitize@2.2.0

```

#### Setup Basic Express
- install express and nodemon
- khởi tạo 1 a basic server trong file app.js sau đó import vào file server.js which listening on PORT=5100
- tạo a basic home route which sends back "hello world"
- setup a script with nodemon package.

[Express Docs](https://expressjs.com/)

Express is a fast and minimalist web application framework for Node.js. It simplifies the process of building web applications by providing a robust set of features for handling HTTP requests, routing, middleware, and more. Express allows you to create server-side applications and APIs easily, with a focus on simplicity and flexibility.

[Nodemon Docs](https://nodemon.io/)

Nodemon is a development tool that improves the developer experience. It monitors your Node.js application for any changes in the code and automatically restarts the server whenever a change is detected. This eliminates the need to manually restart the server after every code modification, making the development process more efficient and productive. Nodemon is commonly used during development to save time and avoid the hassle of manual server restarts.

```sh
npm i express@4.18.2 nodemon@2.0.22
```

app.js : khởi tạo và export 1 ứng dụng express

```js
import express from 'express';
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World');
});

export default app;

```

server.js: import app.js vào file server.js và listen on PORT=5100

```js
// server.js
import app from './src/app.js';

app.listen(5100, () => {
  console.log('server running....');
});
```


package.json: thêm đoạn script sau trong file package.json để thiết lập các khỏi chạy server

```json
"scripts": {
    "dev": "nodemon server.js"
  },
```

Chạy thử server + mở trình duyệt và truy cập vào http://localhost:5100/ xem kết quả

```sh
npm run dev
```


#### Accept JSON

Setup express middleware to accept json truyền lên từ client lên trong file app.js

server

```js
app.use(express.json());

app.post('/', (req, res) => {
  console.log(req);

  res.json({ message: 'Data received', data: req.body });
});
```

Open Postman and send a POST request to http://localhost:5100/ with some JSON data in the body.

#### Morgan and Dotenv

[Morgan](https://www.npmjs.com/package/morgan)

HTTP request logger middleware for node.js

[Dotenv](https://www.npmjs.com/package/dotenv)

Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.

```sh
npm i morgan@1.10.0 dotenv@16.0.3
```
server.js

```js
import morgan from 'morgan';

app.use(morgan('dev'));
```

- tạo .env file in the root
- add PORT and NODE_ENV
- add .env to .gitignore

server.js

```js
// server.js
import app from './src/app.js';
import * as dotenv from 'dotenv';
import morgan from 'morgan';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100;

app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
```

Đã check đc những route chạy ngon lành, giờ hãy xử lí lỗi khi có lỗi xảy ra hoặc không khớp với route nào đó

#### Not Found Middleware

Trong file app.js thêm

```js
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});
```

#### Error Middleware
Trong file app.js thêm
```js
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});
```

#### Not Found and Error Middleware

The "not found" middleware in Express.js is used when a request is made to a route that does not exist. It catches these requests and responds with a 404 status code, indicating that the requested resource was not found.

On the other hand, the "error" middleware in Express.js is used to handle any errors that occur during the processing of a request. It is typically used to catch unexpected errors or exceptions that are not explicitly handled in the application code. It logs the error and sends a 500 status code, indicating an internal server error.

In summary, the "not found" middleware is specifically designed to handle requests for non-existent routes, while the "error" middleware is a catch-all for handling unexpected errors that occur during request processing.

#### Controller and Router and Services

setup controllers and router and services
trong thư mục routes tạo file index.js, folder tour, trong folder tour tạo file index.js
trong thư mục controllers tạo file tour.controller.js
trong thư mục services tạo file tour.service.js
Init router bên trong thư mục app.js

index.js

```js
import { Router } from "express";
import tourRouter from './tour/index.js'; // Provide the correct path to tourController.js
const router = Router();
router.use('/v1/api/tour', tourRouter);
export default router;
```
tour/index.js

```js
import { Router } from "express";
import tourController from "../../controllers/tour.controller.js";


const router = Router();

router
  .route("/")
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route("/:id")
  .get(tourController.getTourById)
  .patch(tourController.updateTourById)
  .delete(tourController.deleteTourById);

export default router;

```



tour.controller.js
```js
import TourService from "../services/tour.service.js";

class TourController {
  getAllTours = async (req, res, next) => {
    console.log("req:",req)
    return await TourService.getAllTours();
  };

  createTour = async (req, res, next) => {
    return await TourService.createTour(req.body);
  };

  getTourById = async (req, res, next) => {
    return await TourService.getTourById(req.params.id);
  };

  updateTourById = async (req, res, next) => {
    return await TourService.updateTourById(req.params.id, req.body);
  };
  deleteTourById = async (req, res, next) => {
    return await TourService.deleteTourById(req.params.id);
  };
}

export default new TourController();

```
tour.service.js

```js


export default class TourService {
  constructor() { }

  static async getAllTours() {
    // thao tác với database
    return {
      msg: "All tours",
    };
  }

  static async createTour(tour) {
    // thao tác với database
    return {
      msg: "createTour",
    };
  }

  static async getTourById(id) {
    // thao tác với database
    return {
      msg: "getTourById",
    };
  }

  static async updateTourById(id, tour) {
    // thao tác với database
    return {
      msg: "updateTourById",
    };
  }

  static async deleteTourById(id) {
    // thao tác với database
    return {
      msg: "deleteTourById",
    };
  }
}


```
app.js : Thêm cấu hình cho init route
```js
import express from 'express';
import router from './routers/index.js';

const app = express();

app.use(express.json());

//Init Rourte

app.use('', router)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ msg: 'something went wrong' });
});

export default app;


```

- Khởi chạy lúc này để call Api sẽ bị lỗi lí do là chúng ta đang cố gắng tách biệt phần service ra chỉ để làm nhiệm vụ về logic mà không xử lí bất cứ tác vụ nào liên quan đến các luồng khác, bên service chỉ có đúng nhiệm vụ trả về data
- Để thực thi điều đó: chúng ta sẽ cố gắng xử lí luồn req, res trong file tour.controller.js

#### Middleware Response/Error and catchAsync

Trong forder middlewares tạo catchAsync.middleware.js, errors.middleware.js, responses.middeware.js

catchAsync.middleware.js
```js
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};
export default catchAsync;
```

errors.middleware.js
```js
import { StatusCodes } from 'http-status-codes';

export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}
export class UnauthenticatedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthenticatedError';
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
export class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const msg = err.message || 'something went wrong, try again later';
  res.status(statusCode).json({ msg });
};

export default errorHandlerMiddleware;

```

responses.middeware.js

```js
const StatusCode = {
	OK: 200,
	CREATED: 201
};

const ReasonStatusCode = {
	CREATED: 'Created',
	OK: 'Success'
};

export class SuccessResponse {
	constructor({ message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {} }) {
		this.message = !message ? reasonStatusCode : message
		this.status = statusCode,
			this.metadata = metadata
	}

	send(res, header = {}) {
		return res.status(this.status).json(this)
	}
}

export class OK extends SuccessResponse {
	constructor({ message, metadata }) {
		super({ message, metadata })
	}
}

export class CREATED extends SuccessResponse {
	constructor({ options = {}, message, statusCode = StatusCode.CREATED, reasonStatusCode = ReasonStatusCode.CREATED, metadata }) {
		super({ message, statusCode, reasonStatusCode, metadata })
		this.options = options
	}
}


```

- Thêm phần xử lí errorHandlerMiddleware vào app.js

app.js

```js
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

app.use(errorHandlerMiddleware);
```

current app.js
```js
import express from 'express';
import router from './routers/index.js';
import errorHandlerMiddleware from './middlewares/errors.middleware.js';

const app = express();

app.use(express.json());

//Init Rourte

app.use('', router)

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

export default app;


```

- Thêm phần xử lí catchAsync vào tour/index.js

tour/index.js
```js
import { Router } from "express";
import tourController from "../../controllers/tour.controller.js";
import catchAsync from "../../middlewares/catchAsync.middleware.js";


const router = Router();

router
  .route("/")
  .get(catchAsync(tourController.getAllTours))
  .post(catchAsync(tourController.createTour));
router
  .route("/:id")
  .get(catchAsync(tourController.getTourById))
  .patch(catchAsync(tourController.updateTourById))
  .delete(catchAsync(tourController.deleteTourById));

export default router;

```

- Thêm phần xử lí responses.middeware.js vào tour.controller.js

tour.controller.js
```js
import { SuccessResponse } from "../middlewares/responses.middeware.js";
import TourService from "../services/tour.service.js";

class TourController {
  getAllTours = async (req, res, next) => {
    new SuccessResponse({
      message: "getAllTours success!",
      metadata: await TourService.getAllTours()
    }).send(res)
  };

  createTour = async (req, res, next) => {
    new SuccessResponse({
      message: "createTour success!",
      metadata: await TourService.createTour(req.body)
    }).send(res)
  };

  getTourById = async (req, res, next) => {
    new SuccessResponse({
      message: "getTourById success!",
      metadata: await TourService.getTourById(req.params.id)
    }).send(res)
  };

  updateTourById = async (req, res, next) => {
    new SuccessResponse({
      message: "updateTourById success!",
      metadata: await TourService.updateTourById(req.params.id, req.body)
    }).send(res)
  };

  deleteTourById = async (req, res, next) => {
    new SuccessResponse({
      message: "deleteTourById success!",
      metadata: await TourService.deleteTourById(req.params.id)
    }).send(res)
  };
}

export default new TourController();



```

- Thêm config trên Postman và dùng thử API vừa tạo


#### Mongose vs Connection DB

#### MongoDB

[MongoDb](https://www.mongodb.com/)

MongoDB is a popular NoSQL database that provides a flexible and scalable approach to storing and retrieving data. It uses a document-oriented model, where data is organized into collections of JSON-like documents. MongoDB offers high performance, horizontal scalability, and easy integration with modern development frameworks, making it suitable for handling diverse data types and handling large-scale applications.

MongoDB Atlas is a fully managed cloud database service provided by MongoDB, offering automated deployment, scaling, and monitoring of MongoDB clusters, allowing developers to focus on building their applications without worrying about infrastructure management.

#### Mongoosejs

[Mongoose](https://mongoosejs.com/)

Mongoose is an Object Data Modeling (ODM) library for Node.js that provides a straightforward and elegant way to interact with MongoDB. It allows developers to define schemas and models for their data, providing structure and validation. Mongoose also offers features like data querying, middleware, and support for data relationships, making it a powerful tool for building MongoDB-based applications.

```sh
npm i mongoose@7.0.5
```

server.js

```js
import mongoose from 'mongoose';

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}

```

file server.js hiện tại

```js
// server.js
import app from './src/app.js';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
dotenv.config();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const port = process.env.PORT || 5100;

try {
  console.log("process.env.MONGO_URL:",process.env.MONGO_URL)
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
```


- Thêm MONGO_URL vào env : link lấy 2 cách theo 2 mô hình triển khai đầu tiên, cài đặt mongo
- Require DOC Monggo đã được gửi
- Trong folder models tạo tour.model.js

```sh
npm i slugify
```

tour.model.js
```js
import mongoose from 'mongoose';
import slugify from 'slugify';

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters']
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0']
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price']
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image']
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

export default mongoose.model('Tour', tourSchema);

```

- thực hiện 1 vài truy vấn bên trong service

- create some obj bằng chat GPT
```js
    {
      "imageCover": "path/to/cover/image.jpg",
      "summary": "An exciting adventure through the mountains.",
      "price": 199.99,
      "difficulty": "medium",  // Corrected value
      "maxGroupSize": 10,
      "duration": 5,  // Duration in hours or days, depending on your application's context
      "name": "Mountain Adventure Tour"
    }

```
tour.service.js

```js
import tourModel from "../models/tour.model.js";

export default class TourService {
  constructor() { }

  static async getAllTours() {
    return await tourModel.find();
  }

  static async createTour(tour) {
    return await tourModel.create(tour);
  }

  static async getTourById(id) {
    return await tourModel.findById(id)
  }

  static async updateTourById(id, tour) {
    return await tourModel.findByIdAndUpdate(id,tour)
  }

  static async deleteTourById(id) {
    return await tourModel.findByIdAndRemove(id)
  }
}


```

- Query Addvanced
- trong folder utils tạo apiFeatures.js


```js
export class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ['page', 'sort', 'limit', 'fields'];
		excludedFields.forEach(el => delete queryObj[el]);

		// 1B) Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));

		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(',').join(' ');
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort('-createdAt');
		}

		return this;
	}

	limitFields() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(',').join(' ');
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select('-__v');
		}

		return this;
	}

	paginate() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}
```

- Sử dụng để truy vấn nâng cao áp dụng với các trường hợp getAll

tour.service.js

```js
  static async getAllTours(query) {
    const features = new APIFeatures(tourModel.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    return await features.query;
  }
```
tour.service.js hiện tại

```js
import tourModel from "../models/tour.model.js";
import { APIFeatures } from "../utils/apiFeatures.js";

export default class TourService {
  constructor() { }

  static async getAllTours(query) {
    const features = new APIFeatures(tourModel.find(), query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
    return await features.query;
  }

  static async createTour(tour) {
    return await tourModel.create(tour);
  }

  static async getTourById(id) {
    return await tourModel.findById(id)
  }

  static async updateTourById(id, tour) {
    return await tourModel.findByIdAndUpdate(id,tour)
  }

  static async deleteTourById(id) {
    return await tourModel.findByIdAndRemove(id)
  }
}


```
- nhớ thêm params trong hàm bên tour.controller.js

```js
  getAllTours = async (req, res, next) => {
    new SuccessResponse({
      message: "getAllTours success!",
      metadata: await TourService.getAllTours(req.query)
    }).send(res)
  };
```