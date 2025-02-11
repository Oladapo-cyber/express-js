import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// __dirname workaround for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files (like CSS, images, JS, etc.) from the "public" folder
app.use(express.static(path.join(__dirname, "public")));

// Custom middleware to allow access only during working hours (Mon-Fri, 9-17)
app.use((req, res, next) => {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 1 = Monday, ... 6 = Saturday
  const hour = now.getHours();

  if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
    next();
  } else {
    res
      .status(403)
      .send("Sorry, the web application is only available Mon-Fri, 9-17.");
  }
});

// Routes
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/services", (req, res) => {
  res.sendFile(path.join(__dirname, "services.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
