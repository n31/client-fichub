import React from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export default class BooksFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buttonValue: "Loaded",
      books: Array()
    };
    this.click = this.click.bind(this);
  }

  componentDidMount() {
    this.click("latest");
  }

  click(e) {
    console.log(e);
    this.setState({
      buttonValue: "Loading...",
      books: Array()
    });
    axios
      .get(`https://fichub-api.herokuapp.com/showBooks?s=${e}`)
      .then(res => {
        this.setState({ books: res.data }, () => {
          console.log(this.state.books);
          this.setState({ buttonValue: "Loaded" });
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({ buttonValue: "Can't load" });
      });
  }

  render() {
    return (
      <div className="App">
        <Select labelId="label" id="select" value="0">
          <MenuItem value="0" disabled>
            Sort by:
          </MenuItem>
          <MenuItem value="latest" onClick={() => this.click("latest")}>
            latest
          </MenuItem>
          <MenuItem value="rating" onClick={() => this.click("rating")}>
            rating
          </MenuItem>
        </Select>
        <input type="button" value={this.state.buttonValue} />
        {this.state.books.map((val, key) => {
          return (
            <Card variant="outlined">
              <h1>{val.name}</h1>
              <p>{val.about}</p>
              <em>
                genre: {val.genre}
                <br />
              </em>
              <em>
                rating: {val.rating}
                <br />
              </em>
              <em>updated: {val.upd}</em>
            </Card>
          );
        })}
      </div>
    );
  }
}
