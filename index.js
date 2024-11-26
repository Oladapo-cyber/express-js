import express from "express";

const app = express();
const port = 409;
const users = [
  {
    name: "John",
    age: 25,
  },
  {
    name: " Jane",
    age: 24,
  },
  {
    name: "Jim",
    age: 25,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/about", (req, res) => {
  res.send("about page.");
});

app.get("/contact", (req, res) => {
  res.send("contact page");
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});

app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});

app.get("/ab(cd)e", (req, res) => {
  res.send("ab(cd)e");
});

app.get("/a/", (req, res) => {
  res.send("/a/");
});

app.get("/users/:age", (req, res) => {
  const { age } = req.params;
  console.log(typeof age);
  const data = users.filter((user) => {
    user.age === parseInt(age);
  });
});

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// Explanation:
// Route /ab?cd:

// The ? character makes the preceding character b optional.
// This route will match both /abcd and /acd.
// Route /ab+cd:

// The + character matches one or more occurrences of the preceding character b.
// This route will match /abcd, /abbcd, /abbbcd, etc.
// Route /ab*cd:

// The * character matches zero or more occurrences of any character.
// This route will match /abcd, /abxcd, /abanythingcd, etc.
// Route /ab(cd)e:

// The parentheses () are treated as literal characters in the URL.
// This route will match /ab(cd)e.
// Each route sends a response with the string that matches the route pattern.
