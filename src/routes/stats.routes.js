import { Router } from "express";
import { getAttendancesStats, getCoursesStats, getStaffsStats, getStudentStats } from "../controllers/stats.controllers.js";


const StatsRouter= Router()

StatsRouter.get( "/students", getStudentStats)

StatsRouter.get("/courses", getCoursesStats)

StatsRouter.get("/staffs", getStaffsStats)

StatsRouter.get("/attendances", getAttendancesStats)


export default StatsRouter