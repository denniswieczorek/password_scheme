import React from 'react';
import PasswordItem from './PasswordItem'

export default class CreatePassword extends React.Component {
  render() {
    const cps =  this.props.tests.map((test, index) => {
      return  <PasswordItem key={index} item = {test} spot = {index} index = {this.props.index} handleSubmit = {this.props.handleSubmit}  type = "create" handleConfirmed = {this.props.handleConfirmed} handleCreate = {this.props.handleCreate}/>
    })
    return <div>{cps} </div>
  }

}
