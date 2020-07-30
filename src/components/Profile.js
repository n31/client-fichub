import React from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Loading...",
      books: null,
      userData: null
    };
    this.auth = 1;
    this.pathArray = window.location.pathname.split("/");
    this.userUpdate = this.userUpdate.bind(this);
    this.setUserUpdate = this.setUserUpdate.bind(this);
  }

  componentWillMount() {
    this.auth = JSON.parse(sessionStorage.getItem("auth"));
  }

  componentDidMount() {
    axios
      .get(`https://fichub-api.herokuapp.com/getuser?name=${this.pathArray[1]}`)
      .then(res =>
        this.setState({ userData: res.data, status: "" }, () =>
          console.log(this.state.userData)
        )
      )
      .catch(err =>
        this.setState({ status: "Not found" }, () => console.log(err))
      );
  }

  userUpdate(e) {
    let data = this.state.userData;
    data.about = e;
    this.setState({
      userData: data
    });
  }

  setUserUpdate() {
    axios
      .post(
        "https://fichub-api.herokuapp.com/userUpdate",
        {
          about: this.state.userData.about
        },
        {
          headers: {
            authorization: this.auth.token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <h1>{this.state.status}</h1>
        {!this.state.status && (
          <Container maxWidth="sm">
            <Box
              display="flex"
              justifyContent="center"
              m={1}
              p={1}
              bgcolor="background.paper"
            >
              <Avatar style={{ height: "100px", width: "100px" }}>
                {this.state.userData.name[0]}
              </Avatar>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              m={1}
              p={1}
              bgcolor="background.paper"
            >
              <h3>{this.state.userData.name}</h3>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              m={1}
              p={1}
              bgcolor="background.paper"
            >
              {this.auth && this.auth.name == this.pathArray[1] ? (
                <TextField
                  value={this.state.userData.about}
                  onChange={e => this.userUpdate(e.target.value)}
                  onBlur={() => this.setUserUpdate()}
                  multiline
                />
              ) : (
                <h4>{this.state.userData.about}</h4>
              )}
            </Box>
          </Container>
        )}
      </>
    );
  }
}
