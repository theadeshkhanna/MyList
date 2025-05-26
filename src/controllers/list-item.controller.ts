import { Request, Response } from "express";
import ListService from "../services/list.service";
import ListItemService from "../services/list-item.service";
import { addItemToListSchema } from "../validations/list-item.validator";
import { redisClient } from "../integrations/redis";
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
  DEFAULT_REDIS_EXPIRY_TIME,
} from "../constants";

export const addItemToList = async (req: Request, res: Response) => {
  try {
    addItemToListSchema.parse(req.body);
  } catch (error: any) {
    res
      .status(422)
      .json({ message: "Unprocessable entity", error: error.issues });
  }

  try {
    const { listId } = req.params;
    const { contentId } = req.body;
    const user = req.user;

    if (!user) {
      throw new Error("Unauthorized: User not found");
    }

    // Check if the list belongs to the user
    const list = await ListService.getListByIdAndUserId(listId, user.id);
    if (!list) {
      res.status(404).json({ message: "List not found" });
    }

    // Check for duplicates
    const existingItem = await ListItemService.getListItemByListIdAndContentId(
      listId,
      contentId
    );

    if (existingItem) {
      res.status(400).json({ message: "Item already exists in the list" });
    }

    const item = await ListItemService.create(listId, contentId);
    res.status(201).json(item);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to add item to list", error: error.message });
  }
};

export const getListItems = async (req: Request, res: Response) => {
  try {
    const { listId } = req.params;
    const user = req.user;

    if (!user) {
      throw new Error("Unauthorized: User not found");
    }

    // Ensure the list belongs to the user
    const list = await ListService.getListByIdAndUserId(listId, user.id);
    if (!list) {
      res.status(404).json({ message: "List not found" });
    }

    const page = parseInt(req.query.page as string) || DEFAULT_PAGE_NUMBER;
    const limit = parseInt(req.query.limit as string) || DEFAULT_ITEMS_PER_PAGE;

    const cacheKey = `listItems:${user.id}:${listId}:page=${page}:limit=${limit}`;
    const cached = await redisClient.get(cacheKey);

    if (cached) {
      res.status(200).json(JSON.parse(cached));
    }

    const items = await ListItemService.getAllListItemByListId(
      listId,
      page,
      limit
    );

    await redisClient.set(
      cacheKey,
      JSON.stringify(items),
      "EX",
      DEFAULT_REDIS_EXPIRY_TIME
    );
    res.status(200).json(items);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get list items", error: error.message });
  }
};

export const removeItemFromList = async (req: Request, res: Response) => {
  try {
    const { listId, itemId } = req.params;
    const user = req.user;

    if (!user) {
      throw new Error("Unauthorized: User not found");
    }

    // Ensure the list belongs to the user
    const list = await ListService.getListByIdAndUserId(listId, user.id);
    if (!list) {
      res.status(404).json({ message: "List not found" });
    }

    const deleted = await ListItemService.delete(itemId, listId);
    if (deleted.count === 0) {
      res.status(404).json({ message: "List item not found" });
    }

    res.status(200).json({ message: "Item removed from list" });
  } catch (error: any) {
    res.status(500).json({
      message: "Failed to remove items from list",
      error: error.message,
    });
  }
};
