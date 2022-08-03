// Dependencies
import axios from "axios";

// Css
import styles from "./Main.module.css";

// Hook
import { useState } from "react";

// Component
import ShowDate from "../ShowData";

const Main = () => {
  const [name, setName] = useState("Country Name");
  const [code, setCode] = useState("Country Code");
  const [temp, setTemp] = useState("273");
  const [status, setStatus] = useState("Country Status");
  const [maxTemp, setMaxTemp] = useState("273");
  const [minTemp, setMinTemp] = useState("273");

  // second Method for state :)

  // const [state, setState] = useState({
  //   name: "Country Name",
  //   code: "Country Code",
  //   temp: 273,
  //   status: "Country Status",
  //   maxTemp: 273,
  //   minTemp: 273,
  // });

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

      setName(response.name);
      setCode(response.sys.country);
      setTemp(response.main.temp);
      setStatus(response.weather[0].main);
      setMaxTemp(response.main.temp_max);
      setMinTemp(response.main.temp_min);

      // second Method for setState :)

      // setState.name(response.name);
      // setState.code(response.sys.country);
      // setState.temp(response.main.temp);
      // setState.status(response.weather[0].main);
      // setState.maxTemp(response.main.temp_max);
      // setState.minTemp(response.main.temp_min);

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
                {`${name} , ${code}`} {/* state.name & state.code */}
              </div>
              <div className={styles.date}>{<ShowDate />}</div>
            </section>

            <div className={styles.current}>
              <div className={styles.temp}>
                {`${Math.floor(temp - 273)} °c`} {/* state.temp */}
              </div>
              <div className={styles.weather}>{status}</div>
              <div className={styles.hi_low}>
                {`${Math.floor(minTemp - 273) || "MIN Temp"} °c / ${
                  Math.floor(maxTemp - 273) || "MAX Temp"
                } °c`}{" "}
                {/* state.minTemp & state.maxTemp */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Main;
