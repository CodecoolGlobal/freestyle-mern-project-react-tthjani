import { useEffect, useState, useRef } from "react";
function HotelSelector({ searchForm, newresult }) {
  const [hotels, setHotels] = useState([]);
  const width = 500;
  const height = 300;
  useEffect(() => {
    if (newresult && newresult.data && newresult.data.data) {
      const hotels = newresult.data.data.flatMap((item) => {
        const url = item.cardPhotos[0].sizes.urlTemplate
          .replace("{width}", width)
          .replace("{height}", height);

        return {
          id: item.id,
          title: item.title,
          url: url,
          secondaryInfo: item.secondaryInfo,
        };
      });

      setHotels(hotels);
    }
  }, [newresult]);

  return (
    <div>
      {searchForm}
      {hotels.map((hotel, index) => (
        <>
          <img
            key={index}
            src={newresult.data.data[index].cardPhotos[0].sizes.urlTemplate
              .replace("{width}", width)
              .replace("{height}", height)}
            alt="Logo"
            className="picture"
          />
          <h2>{newresult.data.data[index].title}</h2>
          <h2>{newresult.data.data[index].secondaryInfo}</h2>
        </>
      ))}
    </div>
  );
}
export default HotelSelector;  