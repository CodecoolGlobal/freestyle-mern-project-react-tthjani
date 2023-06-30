function HotelSelector({ searchForm, hotels }) {
  const width = 500;
  const height = 300;
console.log(hotels)
  return (
    <div>
      {searchForm}
      {hotels.map((hotel, index) => (
        <div key={index}>
          <img
            src={hotel.photo.replace("{width}", width).replace("{height}", height)}
            alt="Logo"
            className="picture"
          />
          <h2>{hotel.title}</h2>
          <h2>{hotel.secondaryInfo}</h2>
        </div>
      ))}
    </div>
  );
}

export default HotelSelector;
