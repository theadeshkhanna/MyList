import { Request, Response } from "express";
import ListService from "../services/list.service";
import {
  createListSchema,
  updateListSchema,
} from "../validations/list.validator";

export const createList = async (req: Request, res: Response) => {
  try {
    createListSchema.parse(req.body);
  } catch (error: any) {
    res
      .status(422)
      .json({ message: "Unprocessable entity", error: error.issues });
  }

  try {
    const { name } = req.body;
    const user = req.user!;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const existingList = await ListService.getListByUserIdAndName(
      user.id,
      name
    );
    if (existingList) {
      res.status(400).json({ message: "A list with this name already exists" });
    }

    const list = await ListService.create(user.id, name);
    res.status(200).json(list);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to create list", error: error.message });
  }
};

export const updateList = async (req: Request, res: Response) => {
  try {
    updateListSchema.parse(req.body);
  } catch (error: any) {
    res
      .status(422)
      .json({ message: "Unprocessable entity", error: error.issues });
  }

  try {
    const { id } = req.params;
    const { name } = req.body;
    const user = req.user!;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const result = await ListService.update(id, user.id, name);
    if (result.count === 0) {
      res.status(404).json({ message: "List not found" });
    }

    const updatedList = await ListService.getListById(id);
    res.status(200).json(updatedList);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to update list", error: error.message });
  }
};

export const getListById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const list = await ListService.getListByIdAndUserId(id, user.id);
    if (!list) {
      res.status(404).json({ message: "List not found" });
    }

    res.status(200).json(list);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to get list", error: error.message });
  }
};

export const deleteList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = req.user!;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const deleted = await ListService.delete(id, user.id);
    if (deleted.count === 0) {
      res.status(404).json({ message: "List not found" });
    }

    res.status(200).json({ message: "List deleted successfully" });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to delete list", error: error.message });
  }
};

export const getAllLists = async (req: Request, res: Response) => {
  try {
    const user = req.user!;

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
    }

    const lists = await ListService.getAllListByUserId(user.id, true);
    res.status(200).json(lists);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "Failed to fetch lists", error: error.message });
  }
};
