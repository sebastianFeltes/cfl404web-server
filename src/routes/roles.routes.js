import { Router } from "express";
import { getRoles } from "../controllers/roles.controllers.js";

const RolesRouter= Router();

RolesRouter.get("/", getRoles)

export default RolesRouter;