import express from "express";
import axios from "axios";

const app = express();
const PORT = 3000;

// 3. Use the public folder for static files.
//Middlewares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


//API-key
const yourBearerToken = "88e12c1424ac8a16f2dc2cb5d1b05218";
const config = {
  headers: { Authorization: `Bearer ${yourBearerToken}` },
};
const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`;

//Define routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/getWeather", async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${yourBearerToken}&units=metric`
    );
    const weatherData = response.data;
    console.log(weatherData.main.temp);
    

    // You can send the weather data to the client
    res.render("index.ejs", { weather: weatherData });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the weather data.");
  }
});

//Run the server

app.listen(PORT, (req, res) => {
  console.log(`Server running on http://localhost:${PORT}`);
});
