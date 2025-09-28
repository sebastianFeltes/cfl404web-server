import { Router } from "express";
import { createUser, getAllUsers, getUserById } from "../controllers/users.controllers.js";

const UsersRouter = Router();
UsersRouter.get("/", getAllUsers);
UsersRouter.get("/:id", getUserById);
UsersRouter.post("/", createUser);

export default UsersRouter;
