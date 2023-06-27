import mongoose from 'mongoose'
import express from 'express'
import User from './model/User.js'
import bcrypt from 'bcrypt'

mongoose.connect("mongodb+srv://tothje98:testpassword@cluster0.yvwpywb.mongodb.net/mongonosz")


const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });
  app.use(express.json())

  bcrypt.genSalt(10, (err, salt) => { //itt kell lennie, mert különben ha mindakét postban benne van különböző saltot kreál
    if (err) {
      console.error('Error generating salt:', err);
      res.status(500).json({ success: false });
      return;
    }

  app.post('/api/registration', (req, res) => {
    const { officialName, username, email, phone, password } = req.body;
    //ide kell  a hashelt változat, bcrypt, ez tud validálni is, ugyanígy el kell hashelni a loginnál is és a két hasht kell összehasonlítani
  
    
  
      bcrypt.hash(password, salt, (err, hashedPassword) => {
        if (err) {
          console.error('Error during password hashing:', err);
          res.status(500).json({ success: false });
          return;
        }
  
        const user = new User({
          officialName,
          username,
          email,
          phone,
          hashedPassword
        });


        console.log(user)
        user.save()
          .then(savedUser => res.json(savedUser))
          .catch(err => {
            console.error('Error saving user:', err);
            res.status(400).json({ success: false });
          });
      });
    ;
  });
  
  app.post('/api/login', (req, res) => {
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
          console.error('Error during password hashing:', err);
          res.status(500).json({ success: false });
          return;
        }

      const loginUser = {
        loginUsername: username,
        loginHashedPassword: hashedPassword
      };
      console.log(loginUser.loginHashedPassword)
      /* console.log(loginUser.loginUsername)
      console.log(loginUser.loginHashedPassword) */
      User.find({username: loginUser.loginUsername})
      .then (users => {
          if(users.length >0){
            console.log(users[0].hashedPassword)
            console.log(loginUser.loginHashedPassword)
            let isMatch = false;
            users.forEach(user => {
              console.log(user.hashedPassword)
              console.log(loginUser.loginHashedPassword)
              console.log(user.hashedPassword)
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
        .catch(err => {
          console.error(err);
          res.status(500).json({ success: false });;
        });
              /* bcrypt.compare( loginUser.loginHashedPassword, (err, result) => {
                if (err) {
                  console.error('Error comparing passwords:', err);
                  res.status(500).json({ success: false });
                  return;
                }
      
                if (result) {
                  console.log('Correct password');
                  res.json({ success: true });
                  return;
                }

              }) */

              

            
          
       /*  } else {
          console.log("not found")
        }
      })
      .catch(err => {
        console.error(err);
      }) */
        
/*         console.log(loginUser)
 */        
      });
    });
  /* }) */;
})
  app.listen(3000, () => console.log('Server running on port 3000'))