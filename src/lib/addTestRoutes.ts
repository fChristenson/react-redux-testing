import { Application } from "express";
import cors from "cors";
import { User } from "./User";

export const addTestRoutes = (app: Application) => {
  app.use(cors());

  app.post("/users", async (req, res) => {
    const user = await User.create(req.body);
    if (req.session) {
      req.session.userId = user._id;
    }
    res.json(user);
  });

  app.post("/clear", async (_req, res) => {
    await User.deleteMany({});
    res.json();
  });
};
