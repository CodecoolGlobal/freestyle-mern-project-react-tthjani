import { useEffect, useState, useRef } from "react";
import HotelSelector from "./HotelSelector";



function Booking() {
    const [newresult, setNewResult] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [searchClicked, setSearchClicked] = useState(false);
    const handleStartChange = (e) => {
      setStartDate(e.target.value);
    };
    
    const handleEndChange = (e) => {
      setEndDate(e.target.value);
    };
    

    const handleSearch = async () => {
        setSearchClicked(true);
        console.log(startDate, endDate);
      
        const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=40.730610&longitude=-73.935242&checkIn=${startDate}&checkOut=${endDate}&pageNumber=1&currencyCode=USD`;
        const options = {
          method: "GET",
          headers: {
            "X-RapidAPI-Key": "aa3656e138msh4e5197e92916ffap1ed974jsn6431154bed3d",
            "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
          },
        };
      
        try {
          const response = await fetch(url, options);
          const result = await response.json();
          if (result && result. data && result.data.data) {
            setNewResult(result);
            
          } else {
            console.error("Invalid response data");
          }
        } catch (error) {
          console.error(error);
        }
      };
      



  const searchForm = (
  <div>
    <input
      className="accomodationStartDate"
      type="date"
      onChange={handleStartChange}
    />
    <input
      className="accomodationEndDate"
      type="date"
      onChange={handleEndChange}
    />
    <input />
    <button onClick={handleSearch}>SEARCH</button>
  </div>
);



return <div>{!searchClicked ?  <HotelSelector searchForm={searchForm}  newresult={newresult}/> : <HotelSelector searchForm={searchForm}  newresult={newresult} />}</div>;
}

export default Booking;
