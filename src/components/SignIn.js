import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.signIn = this.signIn.bind(this);
  }

  signIn() {
    axios
      .post(
        "https://fichub-api.herokuapp.com/signin",
        JSON.stringify(this.state),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        const auth = res.data;
        sessionStorage.setItem("auth", JSON.stringify(auth));
        const test = JSON.parse(sessionStorage.getItem("auth"));
        window.location.href = "/";
      })
      .catch(err => {
        console.log("err", err);
        alert("Wrong email or password");
      });
  }

  render() {
    return (
      <div>
        <h1>Sign In page</h1>

        <div>Email:</div>
        <Form.Control
          type="text"
          placeholder="Enter email"
          value={this.state.email}
          onChange={evt => this.setState({ email: evt.target.value })}
        />
        <br />

        <div>Password:</div>
        <Form.Control
          type="text"
          placeholder="Enter password"
          value={this.state.password}
          onChange={evt => this.setState({ password: evt.target.value })}
        />
        <br />

        <Button variant="outline-success" onClick={this.signIn}>
          Sign In
        </Button>
      </div>
    );
  }
}
