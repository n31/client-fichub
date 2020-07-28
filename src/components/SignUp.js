import React, { Component } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: ""
    };
    this.signUp = this.signUp.bind(this);
  }

  signUp() {
    axios
      .post(
        "https://fichub-api.herokuapp.com/signup",
        JSON.stringify(this.state),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        if (res.status == 200)
          alert("Success! Comfirmation link sent to your email!");
      })
      .catch(err => {
        console.log("err", err);
        alert("Name or Email is already in use");
      });
  }

  render() {
    return (
      <div>
        <h1>Sign Up page</h1>

        <div>Name:</div>
        <Form.Control
          type="text"
          placeholder="Enter name"
          value={this.state.name}
          onChange={evt => this.setState({ name: evt.target.value })}
        />
        <br />

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
          value={this.state.pass}
          onChange={evt => this.setState({ password: evt.target.value })}
        />
        <br />

        <Button variant="outline-success" onClick={this.signUp}>
          Sign Up
        </Button>
      </div>
    );
  }
}
