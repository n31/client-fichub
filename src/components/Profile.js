import React from 'react'
import axios from 'axios'

export default class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      status: "Loading..."
    }
  }

  compoenentWillMount() {
    
  }

  render() {
    return(
      <h1>{this.state.status}</h1>
    )
  }
}