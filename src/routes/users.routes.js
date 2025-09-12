import { Router } from "express";
import { createUser, getAllUsers } from "../controllers/users.controllers.js";

const UsersRouter = Router();
UsersRouter.get("/", getAllUsers);
UsersRouter.post("/", createUser);
export default UsersRouter;
