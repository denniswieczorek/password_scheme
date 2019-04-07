import React from 'react';
import PasswordItem from './PasswordItem'

export default class RunTest extends React.Component {

  render() {
    const copy = this.props.tests;
    const orderArray = this.props.order

    return (
        <div>
        <PasswordItem item = {copy[orderArray[0]]} spot = {3} index = {this.props.index} handleSubmit={this.props.handleSubmit} type = "enter" handleStartTest = {this.props.handleStartTest}/>
        <PasswordItem item = {copy[orderArray[1]]} spot = {4} index = {this.props.index} handleSubmit={this.props.handleSubmit} type = "enter" handleStartTest = {this.props.handleStartTest}/>
        <PasswordItem item = {copy[orderArray[2]]} spot = {5} index = {this.props.index} handleSubmit={this.props.handleSubmit} type = "enter" handleStartTest = {this.props.handleStartTest}/>

        </div>
        )
  }
}
