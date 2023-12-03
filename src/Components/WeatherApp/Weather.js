import React, { useState } from "react";
import "./weather.css";

import search from "../Assets/search.png";
import cloud from "../Assets/cloud.png";
import humidity from "../Assets/humidity.png";
import wind from "../Assets/wind.png";
import clear from "../Assets/clear.png";
import drizle from "../Assets/drizzle.png";
import rain from "../Assets/rain.png";
import thunder from "../Assets/thunder.png";
import snow from "../Assets/snow.png";
import world from "../Assets/world.png";

function Weather() {
  const key = "f3a00dda437e5289a269b8578a83f8a8";
  const [searchInput, setSearchInput] = useState("");
  const [datalist, setDatalist] = useState([
    {
      loc: "City",
      temp: "--°C",
      humidity: "--%",
      wind: "--km/hr",
    },
  ]);

  const [icon, setIcon] = useState(world);

  const searchItem = async () => {
    if (searchInput === " ") {
      return;
    }
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&units=Metric&appid=${key}`;
    setSearchInput("");

    try {
      let response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Failed to fetch data. Status: ${response.status}`);
      }
      let data = await response.json();

      setDatalist([
        {
          loc: data.name,
          temp: Math.floor(data.main.temp) + "°C",
          humidity: data.main.humidity + "%",
          wind: data.wind.speed + "km/hr",
          icon: data.weather[0].icon,
        },
      ]);

      
      const firstIcon = datalist.length > 0 ? datalist[0].icon : null;

      if (firstIcon === "01d" || firstIcon === "01n") {
        setIcon(clear);
      } else if (firstIcon === "02d" || firstIcon === "02n") {
        setIcon(cloud);
      } else if (firstIcon === "03d" || firstIcon === "03n") {
        setIcon(snow);
      } else if (firstIcon === "04d" || firstIcon === "04n") {
        setIcon(cloud);
      } else if (firstIcon === "09d" || firstIcon === "09n") {
        setIcon(drizle);
      } else if (firstIcon === "10d" || firstIcon === "10n") {
        setIcon(rain);
      } else if (firstIcon === "11d" || firstIcon === "11n") {
        setIcon(thunder);
      } else if (firstIcon === "13d" || firstIcon === "13n") {
        setIcon(snow);
      } else {
        setIcon(clear);
      }
    } catch (error) {
      console.error("Error:", error.message);
      alert("City doesnot exist. Please check again.");
    }
    
  };

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          className="city"
          placeholder="Search"
        />
        <div className="search-icon">
          <img src={search} type="submit" onClick={() => searchItem()} alt="" />
        </div>
      </div>

      {datalist.map((to, index) => (
        <div key={index}>
          <div className="weather-image">
            <img src={icon} alt="" />
          </div>
          <div className="weather-temp">{to.temp}</div>
          <div className="weather-loacaion">{to.loc}</div>
          <div className="data-container">
            <div className="element">
              <img src={humidity} alt="" className="icon" />
              <div className="data">
                <div className="humidity">{to.humidity}</div>
                <div className="text">humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind} alt="" className="icon" />
              <div className="data">
                <div className="humidity">{to.wind}</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Weather;
