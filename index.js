// Import the Express module for building our web server
import express from "express";

// Create an instance of the Express application
const app = express();

// Define the port number on which the server will listen
const port = 409;

// Define an array of users. Each user is an object with a "name" and an "age" property.
const users = [
  {
    name: "John",
    age: 25,
  },
  {
    name: "Jane",
    age: 24,
  },
  {
    name: "Jim",
    age: 25,
  },
];

// Define a route for the root URL ("/"). When a GET request is made to "/",
// send an HTML greeting as a response.
app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

// Define a route for the "/about" URL. When a GET request is made to "/about",
// send back the text "about page."
app.get("/about", (req, res) => {
  res.send("about page.");
});

// Define a route for the "/contact" URL. A GET request here will receive the text "contact page"
app.get("/contact", (req, res) => {
  res.send("contact page");
});

// Define a route for "/users". When a GET request is made to this route,
// respond with a JSON representation of the users array.
app.get("/users", (req, res) => {
  res.json(users);
});

// Define a route for "/ab?cd"
// The '?' character makes the preceding character (b) optional, so this route matches both "/abcd" and "/acd".
app.get("/ab?cd", (req, res) => {
  res.send("ab?cd");
});

// Define a route for "/ab+cd"
// The '+' character specifies that the preceding character (b) must appear one or more times.
// Therefore, this route matches "/abcd", "/abbcd", "/abbbcd", etc.
app.get("/ab+cd", (req, res) => {
  res.send("ab+cd");
});

// Define a route for "/ab*cd"
// The '*' character allows for zero or more occurrences of any character between "ab" and "cd".
// This means it will match "/abcd", "/abxcd", "/abanythingcd", etc.
app.get("/ab*cd", (req, res) => {
  res.send("ab*cd");
});

// Define a route for "/ab(cd)e"
// Here, the parentheses are treated as literal characters, so the route must include them exactly as written.
// For example, it will exactly match "/ab(cd)e".
app.get("/ab(cd)e", (req, res) => {
  res.send("ab(cd)e");
});

// Define a route for "/a/". When accessed with a GET request, it sends back "/a/" as the response.
app.get("/a/", (req, res) => {
  res.send("/a/");
});

// Define a parameterized/dynamic route for "/users/:age"
// ":age" is a route parameter that allows you to capture the value in that position
app.get("/users/:age", (req, res) => {
  // Extract the "age" parameter from the request URL. Note that "age" is a string.
  const { age } = req.params;

  // Log the type of "age" to the console. This will output "string".
  console.log(typeof age);

  // Filter the "users" array to find users whose "age" matches the "age" parameter.
  // The parseInt(age) converts the "age" parameter from a string to a number.
  // NOTE: The callback function here is missing a "return" statement,
  // so it does not actually filter correctly. It should be:
  //     return user.age === parseInt(age);
  const data = users.filter((user) => {
    user.age === parseInt(age);
  });

  // The intended behavior is to send the filtered array in the response. A proper implementation would be:
  // res.json(data);
  // However, this code does not send any response, effectively leaving the request hanging.
});

// Start the server so that it listens for incoming requests on the specified port.
// When the server starts, log a message indicating where it is running.
app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});

// --------------------------------------------------------------------------
// Explanation of special routes:
//
// Route: /ab?cd
//   - The "?" makes the preceding character "b" optional.
//   - Matches both "/abcd" (with b) and "/acd" (without b).
//
// Route: /ab+cd
//   - The "+" requires the preceding character "b" to appear one or more times.
//   - Matches paths like "/abcd", "/abbcd", "/abbbcd", etc.
//
// Route: /ab*cd
//   - The "*" allows for zero or more occurrences of any character between "ab" and "cd".
//   - Matches paths like "/abcd", "/abxcd", "/abanythingcd", etc.
//
// Route: /ab(cd)e
//   - Parentheses "()" are used literally in the URL.
//   - Matches the path "/ab(cd)e" exactly.
