import "./App.css";
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import Header from "./components/Header";
import RegistInputField from "./components/RegistInputField";
import LoginField from "./components/LoginField";
import { useState } from "react";
import RegistForm from "./components/RegistForm";
import LoginForm from "./components/LoginForm";
import Logo from "./components/Logo";
import Profilenavbar from "./components/Profilenavbar";
import OptionsNavbar from "./components/OptionsNavbar";
import Booking from "./components/Booking";

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [passwordCorrect, setPasswordCorrect] = useState(false);

  const logInputFields = [
    {
      className: "username",
      id: "username",
      type: "text",
      label: "Username: ",
    },
    {
      className: "password",
      id: "password",
      type: "password",
      label: "Password: ",
    },
  ];

  const regInputFields = [
    {
      className: "firstName",
      id: "firstName",
      type: "text",
      label: "First Name: ",
    },
    {
      className: "lastName",
      id: "lastName",
      type: "text",
      label: "Last Name: ",
    },
    {
      className: "username",
      id: "username",
      type: "text",
      label: "Username: ",
    },

    {
      className: "email",
      id: "email",
      type: "text",
      label: "E-mail: ",
    },
    {
      className: "phoneNumber",
      id: "phone",
      type: "text",
      label: "Phone number: ",
    },
    {
      className: "password",
      id: "password",
      type: "password",
      label: "Password: ",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const keys = Object.keys(regForm);
    let keysHaveValue = true;

    keys.forEach((key) => {
      if (!regForm[key]) {
        keysHaveValue = false;
      }
    });

    if (keysHaveValue) {
      const newRegForm = {
        name: regForm.firstName + " " + regForm.lastName,
        username: regForm.username,
        email: regForm.email,
        phone: regForm.phone,
        password: regForm.password,
      };
      
      console.log(newRegForm);
      setSubmitted(true);

       const data = { 
        officialName: newRegForm.name,
        username:newRegForm.username,
        email: newRegForm.email,
        phone: newRegForm.phone,
        password: newRegForm.password,};
      
        fetch('http://localhost:3000/api/registration', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(response => setRegForm(response))
          .catch(error => console.log(error)) 

        console.log("Registration complete!")
    } else {
      console.log("Not working");
    }

  };
    
  
    

  return (
    <Router>
    <div>
    <Logo />    
    {!passwordCorrect ?
  (!submitted ? (
    <div className="App">
      <Header />
      <Routes>
      <Route path="/main" element={
        <>
         <RegistForm
        handleSubmit={handleSubmit}
        regInputFields={regInputFields}
        setSubmitted={setSubmitted}
        />
         <LoginForm
        logInputFields={logInputFields}
        setPasswordCorrect={setPasswordCorrect} 
        />
        </>
      } />
     
      
        </Routes>
      </div>
  ) : (
    <>
      <h1>Successful registration, please log in!</h1>
      <LoginForm
        logInputFields={logInputFields}
        setSubmitted={setSubmitted}
        setPasswordCorrect={setPasswordCorrect}
      />
    </>
  )
  ):(
    <>
    <Profilenavbar/>
    <OptionsNavbar/>
    <h2>vmi</h2> //searcbaros componens ide jön
    </>  
  )}
 
   <Routes>
    <Route path="/booking" element={<Booking/>}/>
   </Routes>
   </div>

   </Router>
  )
}

export default App;
