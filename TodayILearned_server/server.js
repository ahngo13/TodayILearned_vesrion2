const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const fs = require("fs");
const path = require("path");
const connect = require("./schemas");

connect();

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(express.static(path.join(__dirname, "public")));

fs.readdir("public", (error) => {
  // public 폴더 없으면 생성
  if (error) {
    fs.mkdirSync("public");
    console.log("pulic 폴더 생성됨");
    fs.readdir("public/upload", (error) => {
      // uploads 폴더 없으면 생성
      if (error) {
        fs.mkdirSync("public/upload");
        console.log("upload 폴더 생성됨");
      }
    });
  }
});

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "hamletshu",
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/member", require("./routes/memberRouter"));
app.use("/board", require("./routes/boardRouter"));

app.listen(8080, () => {
  console.log("listen umm..umm..um...");
});
