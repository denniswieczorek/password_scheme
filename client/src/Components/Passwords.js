import React from 'react';
import Logs from './Logs'
import axios from 'axios';
import CreatePassword from './CreatePassword';
import RunTest from './RunTest';
import Help from './Help'


export default class Passwords extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      showHelp: false,
      showFinished: false,
      index: 0,
      logs: [],
      finishTest: true,
      tests : [
        {
          service: 'Banking',
          confirmButton: true,
          createButton: false,
          testButton: true,
          currGuess: '',
          success: false,
          time: 0,
          start: 0
        },
        {// move everything from this window
          service: 'Shopping',
          createButton: true,
          confirmButton: true,
          testButton: true,
          currGuess: '',
          success: false,
          time: 0,
          start: 0
        },
        {
          service: 'Email',
          createButton: true,
          confirmButton: true,
          testButton: true,
          currGuess: '',
          success: false,
          time: 0,
          start: 0
        }
      ]
    }
    this.handleCreate = this.handleCreate.bind(this);
    this.handleConfirmed = this.handleConfirmed.bind(this);
    this.handleTest = this.handleStartTest.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.finishTest = this.finishTest.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShowFinish = this.handleShowFinish.bind(this);

  }

  handleClick() {
    this.setState({showHelp: this.state.showHelp ? false : true})
  }
  handleClose() {
    this.setState({showHelp: false})
  }

  handleShowFinish() {
    this.setState({showFinished: true})
  }

  handleSubmit= (service, guess) => {

    this.setState({ tests: this.state.tests.map((test) => {
      if(test.service === service){
        test.attemptNo = test.attemptNo+1;
        test.currGuess = guess
        if(guess === test.password){
          test.success = true;
        }
        else {
          test.success = false;
        }
        if(test.testConditions){
          if(test.attemptNo === 3 || test.success){
            test.showTest = false;
            this.setState({index: this.state.index+1})
          }

        }
        test.time = Date.now() - test.start;
        test.start = Date.now();
        const log = {
          date: Date(Date.now()),
          user: this.props.user,
          serv: service,
          password: test.password,
          typed: guess,
          attemptNo: test.attemptNo,
          success: test.success,
          mode: test.type,
          time: test.time
        }
        if(test.success){
          window.alert("You have inputted the correct password")
        }
        else {
          window.alert("You have inputted the incorrect password")
        }
        this.setState({logs: [...this.state.logs,log]});
            if(this.state.index === 5 && (test.success||test.attemptNo ===3)){
                this.setState({finishTest: false})
                this.finishTest()
            }
      }

      return test;
    })})
  }
  finishTest() {
    axios.post('/state',{
      logs: this.state.logs
    })
  }
  handleCreate = (service) => {
    axios.get('/generate')
    .then(res =>
    this.setState({ tests: this.state.tests.map(test => {
      if(test.service === service){
        test.password = res.data.first+res.data.second+res.data.third+res.data.forth + res.data.fifth;
        test.beenCreated = true;
        test.intCode = res.data.int;
        test.firstCode = res.data.first;
        test.secondCode = res.data.second;
        test.thirdCode = res.data.third;
        test.forthCode = res.data.forth;
        test.fifthCode = res.data.fifth;
        test.start = Date.now();
        test.createButton = true;
        test.confirmButton = false;
        test.showCreate = true;
        test.type = "create";
        test.attemptNo = 0
      }
      return test;
    })
  }))
}
  handleConfirmed = (service) =>{

      this.setState({index: this.state.index+1})

    this.setState({tests: this.state.tests.map((test) => {
      if(test.service === service) {
        test.confirmButton = true;
        test.showCreate = false;
        const log = {
          date: Date(Date.now()),
          user: this.props.user,
          serv: test.service,
          password: test.password,
          typed: null,
          attemptNo: test.attemptNo,
          success: null,
          mode: "confirmed",
          time: null

        }
        this.setState({logs: [...this.state.logs, log]})
      }
      return test;
    })})
  }
  handleStartTest = (service) => {
    this.setState({ tests: this.state.tests.map(test => {
      if(test.service === service){
        test.isOn = true;
        test.start = Date.now();
        test.beenTested = true;
        test.testConditions = true;
        test.success = false;
        test.attemptNo = 0;
        test.showTest = true;
        test.type = "test"
      }
      return test;
  })})
  }
  render() {
    let help;
    if(this.state.showHelp){
      help = <Help handleClose = {this.handleClose} />
    }
    const finishDisable = this.state.finishTest;
    let finished;
    if(this.state.showFinished){
      finished = <p> Thank you for taking the test, it is now over </p>
    }
    return(
      <div>

      <button onClick = {this.handleClick}> What do I do? </button>
      {help}
        <hr/ >
        <CreatePassword tests = {this.state.tests} index = {this.state.index} handleSubmit = {this.handleSubmit}  type = "create" handleConfirmed = {this.handleConfirmed} handleCreate = {this.handleCreate}/>

        <hr/>
        <RunTest order = {this.props.order} tests = {this.state.tests}  index = {this.state.index} handleSubmit = {this.handleSubmit} type = "enter" handleStartTest={this.handleStartTest}/>
        <button disabled = {finishDisable} onClick = {this.handleShowFinish}>Finish Test </button>
        {finished}
        <hr/>
        <Logs logs = {this.state.logs} />
      </div>
    )
  }
}
