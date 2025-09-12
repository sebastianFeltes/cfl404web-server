import { Router } from "express";
import {
  getAttendancesResume,
  getCoursesResume,
  getStaffsResume,
  getStudentsResume,
} from "../controllers/resumes.controllers.js";

const ResumesRouter = Router();

ResumesRouter.get("/students", getStudentsResume);
ResumesRouter.get("/courses", getCoursesResume);
ResumesRouter.get("/staff", getStaffsResume);
ResumesRouter.get("/attendance", getAttendancesResume);
export default ResumesRouter;
