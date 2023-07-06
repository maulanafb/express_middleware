const express = require("express");
const app = express();
let morgan = require("morgan");

app.use(morgan("dev"));

app.use((req, res, next) => {
  req.timeRequest = Date.now();
  console.log(req.method, req.url);
  next();
});

const auth = (req, res, next) => {
  const { password } = req.query;
  if (!password) {
    res.send("masukkan password");
  } else if (password === "123") {
    next();
  }
  res.send("password salah");
};
app.get("/", (req, res) => {
  console.log(req.timeRequest);
  res.send("Welcome");
});

app.get("/admin", auth, (req, res) => {
  res.send("hello admin");
});

app.use((req, res) => {
  res.status(404).send("Page not Found");
});

app.listen(3000, () => {
  console.log("listening on port 3000");
});
