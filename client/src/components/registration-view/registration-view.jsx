import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";

export function RegistrationView() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Birthday, setBirthday] = useState("");

  const [usernameErr, setUsernameErr] = useState({});
  const [passwordErr, setPasswordErr] = useState({});
  const [emailErr, setEmailErr] = useState({});
  let user = {
    Username,
    Password,
    Email,
    Birthday,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
            Username: Username,
            Password: Password,
            Email: Email,
            Birthday: Birthday,
          };

    const isValid = formValidation();

    const url = "https://cinefandb.herokuapp.com/users/"

    if (isValid) {
      axios
        .post(
          url, createdUser
        )
        .then((response) => {
          // const data = response.data;
          // console.log(data);
          // localStorage.setItem("user", data.Username);
          // props.setUsername(data.Username);
          // alert("Your account was created successfully");
          console.log(response.data);
          login(response.data);
        })
        .catch((e) => {
          console.log(e.response);
          // alert("");
        });
    }
  };

  const login = (data) => {
    axios
      .post('https://cinefandb.herokuapp.com/login', {
        Username: data.Username,
        Password: user.Password,
      })
      .then((res) => {
        const data = res.data;
        props.onLoggedIn(data);
        window.open('/client', '_self');
      })
      .catch((e) => {
        console.log('No such user', e);
      });
  };

  const formValidation = () => {
    const usernameErr = {};
    const passwordErr = {};
    const emailErr = {};
    let isValid = true;

    if (Username.trim().length < 5) {
      usernameErr.usernameShort = "Username must be at least 5 characters";
      isValid = false;
    }

    if (Password.trim().length < 1) {
      passwordErr.passwordMissing = "You must enter a password";
      isValid = false;
    }

    if (!Email.includes(".") && !email.includes("@")) {
      emailErr.emailNotEmail = "A valid email address is required";
      isValid = false;
    }

    setUsernameErr(usernameErr);
    setPasswordErr(passwordErr);
    setEmailErr(emailErr);
    return isValid;
  };

  return (
    <Container>
      <h1>Register a new account</h1>
      <Form className="registration-form">
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={Username}
            placeholder="Enter username"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          {Object.keys(usernameErr).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {usernameErr[key]}
              </div>
            );
          })}
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={Password}
            placeholder="Enter password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {Object.keys(passwordErr).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {passwordErr[key]}
              </div>
            );
          })}
        </Form.Group>
        <Form.Group>
          <Form.Label>Birth Date:</Form.Label>
          <Form.Control
            type="date"
            value={Birthday}
            placeholder="Select Birthday"
            required
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={Email}
            placeholder="name@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {Object.keys(emailErr).map((key) => {
            return (
              <div key={key} style={{ color: "red" }}>
                {emailErr[key]}
              </div>
            );
          })}
        </Form.Group>
        <Link to={`/users/`}>
          <Button
            variant="btn-lg btn-dark btn-block"
            type="submit"
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Link>
      </Form>
    </Container>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import PropTypes from "prop-types";

// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import "./registration-view.scss";

// import { Link } from "react-router-dom";

// export function RegistrationView() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [email, setEmail] = useState("");
//   const [dob, setDob] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const createdUser = {
//       Username: username,
//       Password: password,
//       Email: email,
//       Birthday: dob,
//     };

//     axios
//       .post("https://cinefandb.herokuapp.com/users", createdUser)
//       .then((response) => {
//         console.log(response);
//         console.log(response.data);
//         alert("User created successfully");
//         window.open("/", "_self");
//       })
//       .catch((e) => {
//         console.log(e.response);
//         alert("Error processing request");
//       });
//   };

//   return (
//     <Form style={{ width: "32rem", margin: "auto", textAlign: "center" }}>
//       <Form.Group controlId="formBasicUsername">
//         <Form.Label>Username</Form.Label>
//         <Form.Control
//           type="text"
//           placeholder="Enter username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBasicPassword">
//         <Form.Label>Password</Form.Label>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBasicEmail">
//         <Form.Label>Email address</Form.Label>
//         <Form.Control
//           type="email"
//           value={email}
//           placeholder="Enter email"
//           onChange={(e) => setEmail(e.target.value)}
//         />
//       </Form.Group>

//       <Form.Group controlId="formBasicDate">
//         <Form.Label>Date of Birth</Form.Label>
//         <Form.Control
//           type="date"
//           value={dob}
//           placeholder="12/31/1986"
//           onChange={(e) => setDob(e.target.value)}
//         />
//       </Form.Group>

//       <Button variant="primary" type="submit" onClick={handleSubmit}>
//         Submit
//       </Button>
//       <Link to={`/`}>
//         <Button variant="link" type="submit">
//           Cancel
//         </Button>
//       </Link>
//     </Form>
//   );
// }
