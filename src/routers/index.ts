import { Router } from "express";
import tourRouter from './tour'
const router = Router();
router.use('/v1/api/tour', tourRouter);
export default router;
