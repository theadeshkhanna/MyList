import { Router } from "express";
import {
  addItemToList,
  getListItems,
  removeItemFromList,
} from "../controllers/list-item.controller";
import authMiddleware from "../middlewares/auth.middleware";

const listItemRouter: Router = Router();

listItemRouter.post("/:listId/items", [authMiddleware], addItemToList);
listItemRouter.get("/:listId/items", [authMiddleware], getListItems);
listItemRouter.delete(
  "/:listId/items/:itemId",
  [authMiddleware],
  removeItemFromList
);

export default listItemRouter;
