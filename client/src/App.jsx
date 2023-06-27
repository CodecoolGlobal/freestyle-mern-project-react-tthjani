import "./App.css";
import Header from "./components/Header";
import InputField from "./components/InputField";
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

  const [form, setForm] = useState(usersData);
  // console.log(form);

  const inputFields = [
    {
      className: "firstName",
      id: "firstName",
      type: "text",
      label: "First Name:",
    },
    {
      className: "lastName",
      id: "lastName",
      type: "text",
      label: "Last Name:",
    },
    {
      className: "username",
      id: "username",
      type: "text",
      label: "Username:",
    },

    {
      className: "email",
      id: "email",
      type: "text",
      label: "E-mail:",
    },
    {
      className: "phoneNumber",
      id: "phone",
      type: "text",
      label: "Phone number:",
    },
    {
      className: "password",
      id: "password",
      type: "password",
      label: "Password:",
    },
  ];

  const handleSubmit = (event) => {
    event.preventDefault();

    const newForm = {
      name: form.firstName + " " + form.lastName,
      username: form.username,
      email: form.email,
      phone: form.phone,
      password: form.password,
    };

    setSubmitted(true);
    console.log(newForm);
    console.log("Registration complete!");
  };

  const handleChange = function (event) {
    const id = event.target.id;
    const value = event.target.value;

    setForm((prevForm) => {
      return {
        ...prevForm,
        [id]: value,
      };
    });
  };

  return !submitted ? (
    <div className="App">
      <Header />
      <form onSubmit={handleSubmit}>
        {inputFields.map((inputField, index) => (
          <InputField
            key={index}
            className={inputField.className}
            type={inputField.type}
            label={inputField.label}
            handleChange={handleChange}
            id={inputField.id}
          />
        ))}
        <button type="submit">Register</button>
      </form>
    </div>
  ) : (
    <h1>Thank you for your registration!</h1>
  );
}

export default App;
