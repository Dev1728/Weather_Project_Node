import express from "express";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const API_KEY = process.env.API_KEY;

// Define routes
app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null });
});

app.post("/getWeather", async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
    );
    const weatherData = response.data;
    res.render("home.ejs", { weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the weather data.");
  }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
