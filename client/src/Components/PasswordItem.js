import React from 'react';
import EnterPassword from './EnterPassword';
export default class PasswordItem extends React.Component {


  render() {
    const {service} = this.props.item;
    let createDisabled = this.props.item.createButton
    let confirmDisabled = this.props.item.confirmButton;
    let testDisabled = this.props.item.testButton;
    let highlightStyle;

    if(this.props.spot === this.props.index){
      if(!this.props.item.beenCreated){
        createDisabled = false
        }

      if(!this.props.item.beenTested){
        testDisabled = false
      }
      highlightStyle = {
            background : '#E6DADA',
            padding: '1px',
            borderBottom: '1px #ccc dotted'
      }



    }


    let testType;

    if(this.props.type === "create"){
      testType = <div>
        <p> Create password for: <b>{service}</b> </p>
        <button disabled = {createDisabled} onClick = {()=>this.props.handleCreate(service)} > Create </button>
        <button disabled = {confirmDisabled} onClick = {()=>this.props.handleConfirmed(service)} > Confirm </button>
        {this.props.item.showCreate && (
          <EnterPassword handleSubmit = {this.props.handleSubmit}  item = {this.props.item}/>
        )}
        </div>
    } else if (this.props.type === "enter"){
      testType = <div>
        <p> Enter password for: <b>{service}</b> </p>
        <button onClick = {()=>this.props.handleStartTest(service)} disabled = {testDisabled} > Test </button>
          {this.props.item.showTest && (
          <EnterPassword item = {this.props.item} handleSubmit = {this.props.handleSubmit} />
        )}
        </div>

    }



    return(
      <div style = {highlightStyle}>
      {testType}
      </div>
    )
  }
}
