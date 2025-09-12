import { Router } from "express";
import { getAllAttendances } from "../controllers/attendance.controllers.js";

const AttendanceRouter= Router();

AttendanceRouter.get("/", getAllAttendances)

export default AttendanceRouter;