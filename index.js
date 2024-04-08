const mongoose = require("mongoose");
const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const db = process.env.MONGO_DB;

mongoose
  .connect(db)
  .then(() => console.log(`Connected to mongoDB`))
  .catch((error) => console.log(error));

const port = 3000;
app.listen(port, () => {
  console.log(`Server is Running on Running on Port : ${port}`);
});
