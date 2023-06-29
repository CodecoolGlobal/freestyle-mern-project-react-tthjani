import mongoose from "mongoose";
import express from "express";
import User from "./model/User.js";
import bcrypt from "bcrypt";
import fetch from "node-fetch";
import City from "./model/City.js";

mongoose.connect(
  "mongodb+srv://tothje98:testpassword@cluster0.yvwpywb.mongodb.net/mongonosz"
);

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());

const cities = [
  "Tokyo",
  "Cairo",
  "Budapest",
  "Paris",
  "London",
  "New York",
  "Washington",
  "Rome",
  "Milan",
  "Melbourne",
  "Hong Kong",
  "Seoul",
  "Dubai",
  "Moscow",
  "Chicago",
  "Berlin",
  "Manila",
  "Buenos Aires",
  "Zurich",
  "Toronto",
  "Calgary",
];
app.get("/search", async (req, res) => {
  try {
    const result = cities.map((city) => fetchData(city));
    const results = await Promise.all(result);
    await saveDatatoMongo(results);
    /* console.log(result) */
    res.json({ message: "saved datas" });
  } catch (error) {
    console.error(error);
    res.status(500).send("error");
  }
});

async function fetchData(location) {
  /*     console.log(location)
   */ const url = `https://tripadvisor16.p.rapidapi.com/api/v1/rentals/searchLocation?query=${location}`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d732d4fc8msh8dd14cfacd9d449p1608b6jsn8ce0fc05ce87",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.data;
    /*         console.log(data)
     */ return data;
  } catch (error) {
    console.error(error);
  }
}

async function fetchDataHotels() {
  /*     console.log(location)
   */ const url = `https://tripadvisor16.p.rapidapi.com/api/v1/hotels/getHotelDetails`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "1d732d4fc8msh8dd14cfacd9d449p1608b6jsn8ce0fc05ce87",
      "X-RapidAPI-Host": "tripadvisor16.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    const data = result.data;
    /*         console.log(data)
     */ return data;
  } catch (error) {
    console.error(error);
  }
}

async function saveDatatoMongo(dataArray) {
  console.log(dataArray);
  const cityPromises = dataArray.flatMap((cityData) => {
    console.log("ez itt a cityData:" + cityData);
    return cityData.map((city) => {
      const {
        geoId,
        locationId,
        localizedName,
        localizedAdditionalNames,
        locationV2,
        placeType,
        latitude,
        longitude,
        picture,
      } = city;

      const newCity = new City({
        geoId,
        locationId,
        localizedName,
        localizedAdditionalNames,
        locationV2,
        placeType,
        latitude,
        longitude,
        picture,
      });

      return newCity.save();
    });
  });

  try {
    const savedCities = await Promise.all(cityPromises);
    console.log(savedCities);
  } catch (error) {
    console.error("Error saving cities:", error);
    throw error;
  }
}

/*     app.post('/search', (req, res) => {
     const city = new City({
       geoId,
       locationId,
       localizedName,
       localizedAdditionalNames,
       locationV2,
       placeType,
       latitude,
       longitude,
       picture,
     });


        console.log(city)
        city.save()
          .then(savedCity => res.json(savedCity))
          .catch(err => {
            console.error('Error saving city:', err);
            res.status(400).json({ success: false });
          });
      }); */

bcrypt.genSalt(10, (err, salt) => {
  //itt kell lennie, mert különben ha mindakét postban benne van különböző saltot kreál
  if (err) {
    console.error("Error generating salt:", err);
    res.status(500).json({ success: false });
    return;
  }

  app.post("/api/registration", (req, res) => {
    const { officialName, username, email, phone, password } = req.body;
    //ide kell  a hashelt változat, bcrypt, ez tud validálni is, ugyanígy el kell hashelni a loginnál is és a két hasht kell összehasonlítani

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error during password hashing:", err);
        res.status(500).json({ success: false });
        return;
      }

      const user = new User({
        officialName,
        username,
        email,
        phone,
        hashedPassword,
      });

      console.log(user);
      user
        .save()
        .then((savedUser) => res.json(savedUser))
        .catch((err) => {
          console.error("Error saving user:", err);
          res.status(400).json({ success: false });
        });
    });
  });

  app.post("/api/login", (req, res) => {
    const { username, password } = req.body;
    //ide kell  a hashelt változat, bcrypt, ez tud validálni is, ugyanígy el kell hashelni a loginnál is és a két hasht kell összehasonlítani

    /*    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        console.error('Error generating salt:', err);
        res.status(500).json({ success: false });
        return;
      } */

    bcrypt.hash(password, salt, (err, hashedPassword) => {
      if (err) {
        console.error("Error during password hashing:", err);
        res.status(500).json({ success: false });
        return;
      }

      const loginUser = {
        loginUsername: username,
        loginHashedPassword: hashedPassword,
      };
      console.log(loginUser.loginHashedPassword);
      /* console.log(loginUser.loginUsername)
      console.log(loginUser.loginHashedPassword) */
      User.find({ username: loginUser.loginUsername })
        .then((users) => {
          if (users.length > 0) {
            console.log(users[0].hashedPassword);
            console.log(loginUser.loginHashedPassword);
            let isMatch = false;
            users.forEach((user) => {
              console.log(user.hashedPassword);
              console.log(loginUser.loginHashedPassword);
              console.log(user.hashedPassword);
              if (user.hashedPassword === loginUser.loginHashedPassword) {
                console.log("EGYEZIK");
                isMatch = true;
              }
            });
            if (isMatch) {
              res.json({ success: true, message: "MATCH" });
            } else {
              res.json({ success: false, message: "NO MATCH" });
            }
          } else {
            console.log("not found");
            res.json({ success: false, message: "User not found" });
          }
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ success: false });
        });
    });
  });
});

app.get("/api/getsearch", async (req, res) => {
  const cities = await City.find();
  return res.json(cities);
});

app.post("/api/search", (req, res) => {
  const citySearch = req.body;
  console.log(citySearch.localizedName);
  const currentCity = citySearch.localizedName;
  City.find({ localizedName: new RegExp("^" + currentCity, "i") }) //TÁDÁM
    .then((cities) => res.json(cities))
    .catch((err) => res.status(500).json);
});

app.listen(3000, () => console.log("Server running on port 3000"));
