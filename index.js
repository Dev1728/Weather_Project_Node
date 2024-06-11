import express from "express";
import axios from "axios";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Log environment variables to debug
// console.log("API_KEY:", process.env.API_KEY);
// console.log("PORT:", process.env.PORT);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// API-key
const yourBearerToken = process.env.API_KEY;
// console.log("Bearer Token:", yourBearerToken);

const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${yourBearerToken}&units=metric`;

// Define routes
app.get("/", (req, res) => {
  res.render("index.ejs", { weather: null });
});

app.post("/getWeather", async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${yourBearerToken}&units=metric`
    );
    const weatherData = response.data;
    // console.log(weatherData.main.temp);

    // You can send the weather data to the client
    res.render("index.ejs", { weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the weather data.");
  }
});

// Run the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
