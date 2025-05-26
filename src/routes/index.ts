import { Router } from "express";
import authRouter from "./auth.route";
import listRouter from "./list.route";
import listItemRouter from "./list-item.route";

const rootRouter: Router = Router();

rootRouter.use("/auth", authRouter);
rootRouter.use("/list", listRouter);
rootRouter.use("/list-item", listItemRouter);

export default rootRouter;
