import { Router } from "express";
import { createCourse, getCourses } from "../controllers/courses.controllers.js";

const CoursesRouter = Router();
CoursesRouter.get (`/`, getCourses);
CoursesRouter.post(`/`, createCourse);


export default CoursesRouter;