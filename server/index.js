require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(
      `mongodb+srv://nhnv13122001:1312.com.vn@mern-learnit.aja5saz.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
