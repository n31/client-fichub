import React from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import config from '../../config'

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionActions from "@material-ui/core/AccordionActions";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Avatar from "@material-ui/core/Avatar";

export default class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: "Loading...",
      book: null,
      chapter: null,
      bookData: null,
      chaptersArray: null,
      bookComments: null,
      myComment: ""
    };
    this.auth = 1;
    this.pathArray = window.location.pathname.split("/");
    this.like = this.like.bind(this);
    this.sendComment = this.sendComment.bind(this);
  }

  componentWillMount() {
    this.auth = JSON.parse(sessionStorage.getItem("auth"));
  }

  componentDidMount() {
    console.log(this.pathArray);
    this.setState(
      {
        book: this.pathArray[2] || null,
        chapter: this.pathArray[3] || null
      },
      () => {
        axios
          .get(`https://fichub-api.herokuapp.com/getBook?id=${this.state.book}`)
          .then(res =>
            this.setState(
              {
                bookData: res.data
              },
              () => {
                console.log(this.state.bookData);
                axios
                  .get(
                    `https://fichub-api.herokuapp.com/showChapters?book=${
                      this.state.book
                    }`
                  )
                  .then(res => {
                    this.setState({ chaptersArray: res.data }, () => {
                      console.log(this.state.chaptersArray);
                      axios
                        .get(
                          `https://fichub-api.herokuapp.com/getBookComments?id=${
                            this.state.book
                          }`
                        )
                        .then(res =>
                          this.setState(
                            {
                              bookComments: res.data.reverse(),
                              status: ""
                            },
                            () =>
                              console.log("Comments", this.state.bookComments)
                          )
                        );
                    });
                  })
                  .catch(err => {
                    console.log(err);
                    this.setState({ status: "Can't load" });
                  });
              }
            )
          )
          .catch(err => {
            console.log(err);
            this.setState({ status: "Can't load" });
          });
      }
    );
  }

  like(no) {
    axios
      .post(
        "https://fichub-api.herokuapp.com/like",
        {
          book: this.state.book,
          chapter: no
        },
        {
          headers: {
            authorization: this.auth.token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        let chaptersCopy = this.state.chaptersArray;
        chaptersCopy[no].likes = res.data.likes;
        this.setState({ chaptersArray: chaptersCopy });
      })
      .catch(err => {
        console.log(err);
      });
  }

  sendComment() {
    if (!this.state.myComment) return;
    axios
      .post(
        "https://fichub-api.herokuapp.com/comment",
        {
          book: this.state.book,
          comment: this.state.myComment
        },
        {
          headers: {
            authorization: this.auth.token,
            "Content-Type": "application/json"
          }
        }
      )
      .then(res =>
        this.setState({ myComment: "" }, () => {
          axios
            .get(
              `https://fichub-api.herokuapp.com/getBookComments?id=${
                this.state.book
              }`
            )
            .then(res =>
              this.setState({
                bookComments: res.data.reverse()
              })
            )
            .catch(err => console.log(err));
        })
      )
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <>
        <h2>{this.state.status || this.state.bookData.name}</h2>
        {this.state.status ? null : (
          <>
            <h4>
              <em>{this.state.bookData.about}</em>
            </h4>
            <h6>
              author:{" "}
              <Link to={`/${this.state.bookData.user}`}>
                {this.state.bookData.user}
              </Link>
            </h6>
            <h6>genre: {config.genre[this.state.bookData.genre]}</h6>
            <h6>rating: {this.state.bookData.rating}</h6>
            <h6>update: {this.state.bookData.upd}</h6>
            {this.state.bookData.tags.split("\\,").map((val, key) => {
              return <span>{val} </span>;
            })}
            {this.state.chaptersArray.map((val, key) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    Chapter {val.no} - {val.name}
                  </AccordionSummary>
                  <AccordionDetails>{val.story}</AccordionDetails>
                  {this.auth && (
                    <>
                      <Divider />
                      <AccordionActions>
                        <Button
                          size="small"
                          color="primary"
                          onClick={() => this.like(val.no)}
                        >
                          Like {val.likes}
                        </Button>
                      </AccordionActions>
                    </>
                  )}
                </Accordion>
              );
            })}
            {this.auth && (
              <>
                <br />
                <Divider />
                <br />
                <TextField
                  id="outlined-basic"
                  label="Comment"
                  variant="outlined"
                  size="small"
                  value={this.state.myComment}
                  onChange={e => this.setState({ myComment: e.target.value })}
                />
                <Button onClick={this.sendComment}>Send</Button>
              </>
            )}
            {this.state.bookComments.map((val, key) => {
              return (
                <>
                  <Link to={`/${val.name}`}>
                    <div style={{ display: "flex", marginTop: "5px" }}>
                      <Avatar>{val.name[0]}</Avatar>
                      <h5 style={{ margin: "5px" }}>{val.name}</h5>
                    </div>
                  </Link>
                  <p>{val.comment}</p>
                  <Divider />
                </>
              );
            })}
          </>
        )}
      </>
    );
  }
}
