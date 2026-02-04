
import { useState, useEffect } from "react";
import "../styles/Weather.css";

function Weather() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState("");
    const [darkMode, setDarkMode] = useState(true);
    const [loading, setLoading] = useState(true);


    const cities = ["Delhi", "London", "New York", "Tokyo", "Paris", "Sydney"];

   
    const API_KEY = "210154b9814fac31afa4289a46e0e49c";

   async function fetchWeather(cityName) {
    setLoading(true); 

    try {
        const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
        );
        const data = await res.json();

        if (data.cod === "404") {
            setError("City not found");
            setWeather(null);
            
        } else {
            setWeather(data);
            setError("");
            setCity("")
        }
    } catch {
        setError("Something went wrong");
    } finally {
        setLoading(false)
    }
}
    useEffect(() => {
        const randomCity =
            cities[Math.floor(Math.random() * cities.length)];
        fetchWeather(randomCity);
        
    }, []);

  return (
   <div className={darkMode ? "app dark" : "app"}>

        <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
        >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>

        <div className="weather-container">
            <h1 className="title">Weather</h1>

            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button onClick={() => fetchWeather(city)}>Search</button>
            </div>

            {loading && <p className="loading">Loading...</p>}
            {error && <p className="error">{error}</p>}

            {!loading && weather && (
                <div className="weather-card">
                    <h2 className="city">{weather.name}</h2>

                    <img
                        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                        alt="icon"
                    />

                    <p className="temp">{weather.main.temp}°C</p>

                    <p className="desc">
                        {weather.weather[0].description}
                    </p>

                    <div className="info">
                        <span>💧 {weather.main.humidity}%</span>
                        <span>💨 {weather.wind.speed} m/s</span>
                    </div>
                </div>
            )}
        </div>
    </div>
);

}

export default Weather;
