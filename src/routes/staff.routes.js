import { Router } from "express";
import { getAllStaff } from "../controllers/staff.controllers.js";

const StaffRouter = Router();

StaffRouter.get('/', getAllStaff);

export default StaffRouter;