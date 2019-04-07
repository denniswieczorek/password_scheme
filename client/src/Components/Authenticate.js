import React from 'react';


export default class Authenticate extends React.Component {
  render(){
    return (<div>
              <h3> Enter the token provided for you, or enter 'demo' if just viewing </h3>
              <input type = "text" onChange = {this.props.handleChange} placeholder = "token" value = {this.props.userid}/>
              <button  value={this.props.userid} onClick = {this.props.submitToken} type="submit">Submit</button>

            </div>)
  }
}
