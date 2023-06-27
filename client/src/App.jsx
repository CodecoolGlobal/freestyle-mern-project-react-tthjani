import "./App.css";
import Header from "./components/Header";
import RegistInputField from "./components/RegistInputField";
import LoginField from "./components/Login";
import { useState } from "react";

function App() {
  const [submitted, setSubmitted] = useState(false);

  let usersData = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  };

  let userAccData = {
    username: "",
    password: "",
  };

  const [regForm, setRegForm] = useState(usersData);
  const [accForm, setAccForm] = useState(userAccData);

  //console.log(form);

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
    console.log(keys);

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
    } else {
      console.log("Not working");
    }
  };

  const loginSubmit = (event) => {
    event.preventDefault();

    const newAccForm = {
      username: accForm.username,
      password: accForm.password,
    };

    console.log(newAccForm);
    console.log("Login complete!");
  };

  const handleRegChange = function (event) {
    const id = event.target.id;
    const value = event.target.value;

    setRegForm((prevForm) => {
      return {
        ...prevForm,
        [id]: value,
      };
    });
  };

  const handleAccChange = function (event) {
    const id = event.target.id;
    const value = event.target.value;

    setAccForm((prevForm) => {
      return {
        ...prevForm,
        [id]: value,
      };
    });
  };

  return !submitted ? (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit} className="regCard">
        {regInputFields.map((inputField, index) => (
          <RegistInputField
            key={index}
            className={inputField.className}
            type={inputField.type}
            label={inputField.label}
            handleChange={handleRegChange}
            id={inputField.id}
          />
        ))}

        <button type="submit">Register</button>
      </form>
      <form onSubmit={loginSubmit} className="logCard">
        {logInputFields.map((inputField, index) => (
          <LoginField
            key={index}
            className={inputField.className}
            type={inputField.type}
            label={inputField.label}
            handleChange={handleAccChange}
            id={inputField.id}
          />
        ))}
        <button type="submit">Login</button>
      </form>
    </div>
  ) : (
    <>
      <h1>Successful registration, please log in!</h1>
      <form onSubmit={loginSubmit}>
        {logInputFields.map((inputField, index) => (
          <LoginField
            key={index}
            className={inputField.className}
            type={inputField.type}
            label={inputField.label}
            handleChange={handleAccChange}
            id={inputField.id}
          />
        ))}
        <button type="submit">Login</button>
      </form>
    </>
  );
}

export default App;
