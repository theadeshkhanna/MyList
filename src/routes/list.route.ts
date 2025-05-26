import { Router } from "express";
import {
  createList,
  deleteList,
  getAllLists,
  getListById,
  updateList,
} from "../controllers/list.controller";
import authMiddleware from "../middlewares/auth.middleware";

const listRouter: Router = Router();

listRouter.post("/", [authMiddleware], createList);
listRouter.get("/", [authMiddleware], getAllLists);
listRouter.get("/:id", [authMiddleware], getListById);
listRouter.put("/:id", [authMiddleware], updateList);
listRouter.delete("/:id", [authMiddleware], deleteList);

export default listRouter;
