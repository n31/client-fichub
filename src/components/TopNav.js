import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import Avatar from "@material-ui/core/Avatar";

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.auth = 1;
    this.goToProfile = this.goToProfile.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {
    this.auth = JSON.parse(sessionStorage.getItem("auth"));
    console.log("func ", this.auth);
  }

  logout() {
    sessionStorage.removeItem("auth");
    window.location.href = "/login";
  }

  goToProfile() {
    window.location.href = `/${this.auth.name}`;
  }

  render() {
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="sm" sticky="top">
          <Navbar.Brand href="/">
            <em>Fic</em>
            <b>Hub</b>
          </Navbar.Brand>

          {this.auth ? (
            <>
              <Nav.Link>
                <Avatar onClick={this.goToProfile}>{this.auth.name[0]}</Avatar>
              </Nav.Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link onClick={this.logout}>Log Out</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          ) : (
            <>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <Nav.Link href="/">Home</Nav.Link>
                  <Nav.Link href="/login">Sign In</Nav.Link>
                  <Nav.Link href="/registration">Sign Up</Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </>
          )}
        </Navbar>
      </div>
    );
  }
}
