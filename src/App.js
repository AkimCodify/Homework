import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import img1 from './images/🦆 icon _location_.png'
import img2 from './images/🦆 icon _temperature_.png'

export let City = "Bishkek";

function App() {
  let [weather, setWeather] = useState(null);
  let [city, setCity] = useState(City); 
  let [isCelsius, setCelsius] = useState(true)
  const fetchWeather = (city) => {
    axios
      .get(
        `http://api.weatherapi.com/v1/current.json?key=a7489e7febba4fc788670042241208&q=${city}&aqi=no`
      )
      .then((res) => {
        setWeather(res.data); 
        axios.post("http://localhost:8000/data", res.data); 
        console.log(res.data);
      })
      .catch((error) => console.error("Error fetching weather:", error));
  };

  
  useEffect(() => {
    fetchWeather(city);
  }, [city]);


  const handleSearch = (e) => {
    e.preventDefault();
    const searchCity = e.target.elements.cityInput.value;
    setCity(searchCity);
    e.target.elements.cityInput.value = ''
  };


  const handleReset = () => {
    setCity(City);
  };

  return (
    <div className="App">
      <form className="InputBox" onSubmit={handleSearch}>
        <input
          type="text"
          className="input"
          name="cityInput"
          placeholder="Search location..."
        />
        <div className="btnBox">
          <button type="submit" className="submitBtn">
            Submit
          </button>
          <button type="button" className="resetBtn" onClick={handleReset}>
            Reset to Default
          </button>
        </div>
      </form>

      {weather && (
        <div className="Box">
          <h2 className="city">
            <img src={img1} alt="location icon" className="img1"/>
            {weather.location.name}
          </h2>

          <div className="temp-box">
            <img src={img2} alt="temperature icon" className="img2" />
            <h1 className="temp">
              {isCelsius
                ? `${Math.round(weather.current.temp_c)}°C`
                : `${Math.round(weather.current.temp_f)}°F`}
            </h1>
            <img
              src={`https:${weather.current.condition.icon}`}
              alt={weather.current.condition.text}
              className="img2"
            />
          </div>

          <p className="date">
            {new Date(weather.location.localtime).toLocaleString()}
          </p>

          <div className="box">
            <div className="div">
              <p className="chapter">Humidity</p>
              <div className="se">
                <p className="text1">{weather.current.humidity}%</p>
              </div>
            </div>

            <div className="div">
              <p className="chapter">Visibility</p>
              <div className="se">
                <p className="text2">{weather.current.vis_km} km</p>
              </div>
            </div>

            <div className="div">
              <p className="chapter">Air Pressure</p>
              <div className="se">
                <p className="text3">{weather.current.pressure_mb} hPa</p>
              </div>
            </div>

            <div className="div">
              <p className="chapter">Wind</p>
              <div className="se">
                <p className="text4">{weather.current.wind_mph} mph</p>
              </div>
            </div>
          </div>
          <label class="toggle">
            <input
              class="toggle-input"
              type="checkbox"
              onChange={(e) => {
                if (e.target.checked) {
                  setCelsius(false);
                } else {
                  setCelsius(true);
                }
              }}
            />
            <span class="toggle-label"></span>
            <span class="toggle-handle"></span>
            <span class="toggle-celsius">°C</span>
            <span class="toggle-fahrenheit">°F</span>
          </label>
        </div>
      )}
    </div>
  );
}

export default App;
