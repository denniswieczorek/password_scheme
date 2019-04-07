import React from 'react';

export default class Logs extends React.Component {
  render() {
    const logs = this.props.logs.map((log, index)=> {
      let success;
      if(log.success){
          success = "success"
      } else {
        success = "fail"
      }
      return <li key ={index}>  {log.date} {log.user} {log.serv} {log.attemptNo} {success} {log.mode} {log.time} </li>
    })


    return (
      <div>
      <h2> Log </h2>
      <p> Note that along with the displayed data we also store the password and what you submit for an attempt at the passwords
      we do not include these for the sake of integrity of the test</p>
      <ul>
      {logs}
      </ul>
      </div>
    )
  }
}
