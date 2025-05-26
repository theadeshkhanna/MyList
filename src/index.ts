import app from "./app";
import { Request, Response } from "express";
import { PORT } from "./secrets";

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    name: "Adesh Khanna",
    product: "MyList",
    howToUse: "Refer github readme",
    APIStatus: "Working",
  });
});

app.listen(PORT, () => {
  console.log(`App is working`);
});
