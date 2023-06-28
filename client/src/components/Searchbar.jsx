import React, { useEffect, useState } from "react";

function Searchbar() {
  useEffect(() => {
    const getData = async () => {
      let cityNames = [];

      const url = `https://tripadvisor16.p.rapidapi.com/api/v1/rentals/searchLocation?query=${location}`;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "aa3656e138msh4e5197e92916ffap1ed974jsn6431154bed3d",
          "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
        },
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        const data = result.data;

        data.forEach((city) => {
          console.log(city.localizedName);
          cityNames.push(city.localizedName);
        });
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  });
  const [location, setLocation] = useState();

  const handleChange = function (event) {
    const value = event.target.value;
    setLocation(value);
  };

  return (
    <div>
      <input
        id="search"
        type="search"
        placeholder="Search a location"
        onChange={handleChange}
      ></input>
    </div>
  );
}

export default Searchbar;
