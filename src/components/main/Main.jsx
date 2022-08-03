// Dependencies
import axios from "axios";

// Css
import styles from "./Main.module.css";

// Hook
import { useState } from "react";

// Component
import ShowDate from "../showData/ShowData";

const Main = (loading) => {
  const [countryName, setCountryName] = useState("Country Name");
  const [countryCode, setCountryCode] = useState("Country Code");
  const [countryTemp, setCountryTemp] = useState("273");
  const [countryStatus, setCountryStatus] = useState("Country Status");
  const [countryMaxTemp, setCountryMaxTemp] = useState("273");
  const [countryMinTemp, setCountryMinTemp] = useState("273");

  let apiData = {
    url: "https://api.openweathermap.org/data/2.5/weather?q=",
    key: "240a36970af6c5c52d47aa91848af1af",
  };

  const fetchData = async (e) => {
    let inputCountry = e.target.value;

    try {
      const { data: response } = await axios.get(
        `${apiData.url}${inputCountry}&appid=${apiData.key}`
      );

      setCountryName(response.name);
      setCountryCode(response.sys.country);
      setCountryTemp(response.main.temp);
      setCountryStatus(response.weather[0].main);
      setCountryMaxTemp(response.main.temp_max);
      setCountryMinTemp(response.main.temp_min);

      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const enter = (e) => {
    if (e.charCode === 13) {
      fetchData(e);
      e.target.value = "";
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.main_content}>
          <header>
            <input
              type="text"
              autoComplete="off"
              className="search-box"
              placeholder="Search for a city..."
              onKeyPress={enter}
            />
          </header>

          <main>
            <section className={styles.location}>
              <div className={styles.city}>
                {`${countryName} , ${countryCode}`}
              </div>
              <div className={styles.date}>{<ShowDate />}</div>
            </section>

            <div className={styles.current}>
              <div className={styles.temp}>
                {`${Math.floor(countryTemp - 273)} °c`}
              </div>
              <div className={styles.weather}>{countryStatus}</div>
              <div className={styles.hi_low}>
                {`${Math.floor(countryMinTemp - 273) || "MIN Temp"} °c / ${
                  Math.floor(countryMaxTemp - 273) || "MAX Temp"
                } °c`}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
