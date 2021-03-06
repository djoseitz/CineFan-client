import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /**
   * Triggers when "Login" button is clicked. This method will send <code>POST</code>
   * request to the server with header contains <code>Username</code> and <code>Password</code>
   * Then, with response data, calls <code>{@link onLoggedIn|onLoggedIn}</code> method from its props.
   * @param {MouseEvent} e On click "Login" button
   * @name handleSubmitLogin
   * @method
   * @async
   */

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    axios
      .post("https://cinefandb.herokuapp.com/login", {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch((e) => {
        alert("no such user");
        console.log("no such user");
      });
  };

  return (
    <Container>
      <Form className="loginForm">
        <Form.Group controlId="formBasicUsername">
          <Form.Label className="label">Username:</Form.Label>
          <Form.Control
            type="text"
            classname="login-field"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label className="label">Password:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <span className="nav-Btn">
          <Button variant="outline-dark" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </span>
        {/* <Link to={`/register`}>
            <Button
              className="sign-up-button new-user"
              variant="dark"
            >
            New User Sign Up
            </Button>
          </Link> */}
      </Form>
    </Container>
  );
}
