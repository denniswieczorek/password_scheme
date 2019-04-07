import React, { Component } from 'react';
import Passwords from './Components/Passwords';
import Authenticate from './Components/Authenticate'
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {authenticated : false, userid: ''}
    this.submitToken = this.submitToken.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  submitToken() {
    axios.get(`/tokens?user=${this.state.userid}`)
    .then(res =>
          this.setState({
            userid: res.data.length === 0 ? '' : this.state.userid,
            authenticated: res.data.length === 0 ? false : true
          })

      )

  }
  handleChange(e) {
    this.setState({userid: e.target.value})
  }
  render() {

    const orderArray = randomizeArray([0,1,2]);
    let display;
    if(this.state.authenticated){
      display = <Passwords order= {orderArray} user = {this.state.userid}/>
    }
    else {
      display = <Authenticate userid = {this.state.userid} submitToken = {this.submitToken} handleChange = {this.handleChange}/>
    }
    return (

      <div>
      <h2> Graphical Password Scheme </h2>
      <div className="App">
      <hr />

      {display}
      </div>
      </div>
    );
  }
}

export default App;



function randomizeArray(array) {
  let i = array.length-1;
  for(;i>0;i--){
    const j = Math.floor(Math.random() * (i+1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
