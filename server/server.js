import mongoose from 'mongoose'
import express from 'express'
import User from './model/User.js'
mongoose.connect("mongodb+srv://tothje98:testpassword@cluster0.yvwpywb.mongodb.net/mongonosz")


const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(express.json())

  app.post('/api/users', (req, res) => {
    const { officialName, username, email, phone, password} = req.body;
    
    //ide kell a hashelt változat, bcrypt, ez tud validálni is, ugyanígy el kell hashelni a loginnál is és a két hasht kell összehasonlítani
    const hashPassword = getHashPassword(password)

    const user = new User({
      officialName,
      username,
      email,
      phone,
      hashPassword
    })

    user.save()
    .then(savedUser => res.json(savedUser))
    .catch(err => res.status(400).json({ success: false}))
  }  
  )

  app.listen(3000, () => console.log('Server running on port 3000'))