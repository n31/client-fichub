import React, { Component } from "react";
import { TagCloud } from "react-tagcloud";
import BooksFilter from "./BooksFilter";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.auth = 1;
    this.data = 1;
  }

  componentWillMount() {
    this.auth = JSON.parse(sessionStorage.getItem("auth"));
    console.log("func ", this.auth);

    this.data = [
      { value: "JavaScript", count: 38 },
      { value: "React", count: 30 },
      { value: "Nodejs", count: 28 },
      { value: "Express.js", count: 25 },
      { value: "HTML5", count: 33 },
      { value: "MongoDB", count: 18 },
      { value: "CSS3", count: 20 }
    ];
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <BooksFilter />
        <TagCloud
          minSize={12}
          maxSize={35}
          tags={this.data}
          onClick={tag => alert(`'${tag.value}' was selected!`)}
        />
      </div>
    );
  }
}
