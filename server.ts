import { app } from "./src/app";
import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/app", { useNewUrlParser: true });

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Running on: ", port);
  console.log("--------------------------");
});
