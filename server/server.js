import mongoose from 'mongoose'
import express from 'express'
mongoose.connect("mongodb+srv://tothje98:testpassword@cluster0.yvwpywb.mongodb.net/mongonosz")

const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(express.json())


  app.listen(3000, () => console.log('Server running on port 3000'))