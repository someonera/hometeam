import mongoose from "mongoose";
mongoose.connect("mongodb://localhost:27017/hometeam", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("db connected!");
});
