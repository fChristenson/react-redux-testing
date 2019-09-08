import express from "express";
import path from "path";
import session from "express-session";
import { User } from "./lib/User";
import { addTestRoutes } from "./lib/addTestRoutes";

export const app = express();

app.use(
  session({
    secret: "super secret",
    resave: false,
    saveUninitialized: true,
    name: "session"
  })
);

app.use(express.static(path.join(__dirname, "..", "dist")));
app.use(express.json());

app.get("/api/v1/users/current", async (req, res) => {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({ msg: "401" });
  }

  const user = await User.findById(req.session.userId);
  return res.json(user);
});

app.post("/api/v1/login", async (req, res) => {
  const { username, password } = req.body;
  let user = await User.findOne({ username, password });

  // some demo code just to create the first user
  if (!user && username === "foo" && password === "bar") {
    user = await User.create({ username, password });
  }

  if (!user) return res.status(401).json({ msg: "401" });

  if (req.session) {
    req.session.userId = user._id;
  }

  return res.json(user);
});

const todos: string[] = [];

app.post("/api/v1/todos", async (req, res) => {
  todos.push(req.body.todo);
  return res.json(req.body.todo);
});

app.get("/api/v1/todos", async (_req, res) => {
  return res.json(todos);
});

app.get("/logout", (req, res) => {
  if (req.session) {
    return req.session.destroy(() => {
      return res.redirect("/login");
    });
  }

  return res.redirect("/login");
});

if (process.env.NODE_ENV === "development") {
  addTestRoutes(app);
}

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "..", "dist", "index.html"));
});
