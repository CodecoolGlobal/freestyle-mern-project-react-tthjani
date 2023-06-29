import React, { useState } from "react";

function Searchbar() {
  const [inputValue, setInputValue] = useState();
  const [cities, setCities] = useState([]);

  const submitValue = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setInputValue(value);
    console.log(inputValue);
    fetch("http://localhost:3000/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ localizedName: inputValue }),
    })
      .then((response) => response.json())
      .then((response) => {
        setCities(response);
        console.log(response);
        console.log("Fetch dofcasfasdasd!");
      })
      .catch((error) => console.log(error));

    console.log("Fetch done!");
  };

  return (
    <div>
      <input
        id="search"
        type="search"
        placeholder="Search a location"
        onChange={submitValue}
      ></input>
      <ul className="dropdown-menu options">
        {cities.map((city) => (
          <li key={city.id}>
            {city.localizedName} - {city.locationV2}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Searchbar;
