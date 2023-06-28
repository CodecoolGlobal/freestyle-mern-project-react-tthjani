import { useEffect, useState } from "react";


function Booking() {
const [newresult, setNewResult] =useState('')

useEffect(() => {
 
const fetchData = async() =>{

const url = 'https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation?latitude=40.730610&longitude=-73.935242&checkIn=2023-06-29&checkOut=2023-06-29&pageNumber=1&currencyCode=USD';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '75ae5e6804msh9084257fa081838p127c40jsn71c8d4a1f3c3',
    'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
  }
};

try {
	const response = await fetch(url, options);
	const result = await response.json();
    setNewResult(JSON.stringify(result))
    console.log(typeof result)
} catch (error) {
	console.error(error);
}
}
fetchData(); 
}, [])


    return (
        <div>
        <button>HOTELS</button>
        <button>RESTAURANTS</button>
        <button>ATTRACTIONS</button>

        <h2>{newresult}</h2>
        </div>
    )
    ;
  }
  
  export default Booking;
  