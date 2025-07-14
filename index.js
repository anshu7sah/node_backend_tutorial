import express from "express";

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log("intermediate");
  next();
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;
  console.log(username);
  console.log(email);
  console.log(password);
  res.status(201).send("register successfully");
});

app.listen(3000, () => {
  console.log("listening on port 3000 express");
});
