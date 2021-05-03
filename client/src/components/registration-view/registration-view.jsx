import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import axios from "axios";
import "./registration-view.scss";

export function RegistrationView(props) {
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

  /**
   * Registers new user. Send <code>POST</code> request with header.
   * <code>handlesubmitRegister</code> then call <code>{@link login|login}</code>
   * <pre>
   * {
   *    Username: string
   *    Password: string
   *    Email: string
   *    Birthday: Date
   * }
   * </pre>
   * @param {MouseEvent} e On click "Register" button
   * @mehtod
   * @async
   * @global
   * @name handleSubmit
   */

  const handleSubmit = (e) => {
    e.preventDefault();

    const createdUser = {
      Username: Username,
      Password: Password,
      Email: Email,
      Birthday: Birthday,
    };

    const isValid = formValidation();

    const url = "https://cinefandb.herokuapp.com/users/";

    if (isValid) {
      axios
        .post(url, createdUser)
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

  /**
   * Logs in the new user with user data received from
   * <code>{@link handlesubmitRegister|handlesubmitRegister}</code>
   * @param {Object} data New user data
   * @name login
   * @method
   * @async
   */
  const login = (data) => {
    axios
      .post("https://cinefandb.herokuapp.com/login", {
        Username: data.Username,
        Password: user.Password,
      })
      .then((res) => {
        const data = res.data;
        props.onLoggedIn(data);
        window.open("/", "_self");
      })
      .catch((e) => {
        console.log("No such user", e);
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
      <h1 className="label">Register a new account</h1>
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
        <span className="nav-Btn">
          <Link to={`/users/`}>
            <Button
              variant="btn-lg btn-dark btn-block"
              type="submit"
              onClick={handleSubmit}
            >
              Register
            </Button>
          </Link>
        </span>
      </Form>
    </Container>
  );
}
