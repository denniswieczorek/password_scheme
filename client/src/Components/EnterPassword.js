import React from 'react';
import Picture from './Picture'

export default class EnterPassword extends React.Component {
  constructor(props){
    super(props);
    this.state = {value: '', clickOrder: [], clickCount: 1, hidePassword: false};
    this.handleChange = this.handleChange.bind(this)
    this.handleClick =  this.handleClick.bind(this);
    this.handleCorrect = this.handleCorrect.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }
  handleCorrect() {
    let oldString = this.state.value;
    if(oldString.length >0 ){
      this.state.clickOrder.pop();
      oldString = oldString.substring(0,oldString.length-1);
      this.setState({value: oldString, clickCount: this.state.clickCount-1, clickOrder: this.state.clickOrder})
    }
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }
  toggleShow() {
    this.setState({hidePassword: this.state.hidePassword ? false : true})
  }
  handleClick=(e)=> {
    this.setState({value: this.state.value + this.state.clickCount,clickOrder: [...this.state.clickOrder,e.target.id], clickCount: this.state.clickCount+1}, () => {
      if((this.state.clickCount) > 5){
        const keyword = this.state.clickOrder.join("")
        this.setState({value: '', clickOrder: '', clickCount: 1})
        this.props.handleSubmit(this.props.item.service, keyword)
      }
    })
  }

  render() {
    const images = [ [
                      {image: 'images/alligator.jpeg', id: 'alligator'},
                      {image: 'images/bear.jpeg', id: "bear"},
                      {image: 'images/bee.jpeg', id: "bee"},
                      {image: 'images/dog.jpg', id: "dog"},
                      {image: 'images/horse.jpg', id: 'horse'}
                    ],
                    [
                      {image: 'images/frog.jpeg',id: "frog"},
                      {image: 'images/gorilla.jpeg',id: "gorilla"},
                      {image: 'images/hippo.jpeg', id: "hippo"},
                      {image: 'images/penguin.jpeg', id:"penguin"},
                      {image: 'images/giraffe.jpg', id: 'giraffe'}
                    ],
                    [
                      {image: 'images/snail.jpeg', id: "snail"},
                      {image: 'images/squirrel.jpeg', id: "squirrel"},
                      {image: 'images/tiger.jpg',id: "tiger"},
                      {image: 'images/turtle.jpg',id: "turtle"},
                      {image: 'images/cow.jpg', id: "cow"}
                    ],
                    [

                        {image: 'images/elephant.jpg', id: "elephant"},
                        {image: 'images/fox.jpg', id: "fox"},
                        {image: 'images/duck.jpg', id: "duck"},
                        {image: 'images/mouse.jpg', id: "mouse"},
                        {image: 'images/fish.jpg', id: "fish"},
                    ]
                ];

    const { firstCode, secondCode, thirdCode, forthCode, fifthCode} = this.props.item;


    const imageGrid = images.map((col, index)=> {
      return (<div className="column" key={index}> {
          col.map((image) => {
              let st;
              let mainStyle = {
                width: "200px",
                height: "120px",
                padding: "10px"
              }
              if(this.props.item.type === "create" && !this.state.hidePassword){
              if(image.id === this.props.item.firstCode && this.state.clickCount === 1){

                  st = {
                  background: "gold"
                  }
                  mainStyle = {...mainStyle,...st}
            } else if(image.id === this.props.item.secondCode && this.state.clickCount === 2){
              st = {
              background: "gold"
              }
              mainStyle = {...mainStyle,...st}
            } else if(image.id === this.props.item.thirdCode && this.state.clickCount === 3){
              st = {
              background: "gold"
              }
              mainStyle = {...mainStyle,...st}
            }
           else if(image.id === this.props.item.forthCode && this.state.clickCount === 4){
              st = {
              background: "gold"
              }
              mainStyle = {...mainStyle,...st}
            }
           else if(image.id === this.props.item.fifthCode && this.state.clickCount === 5){
              st = {
              background: "gold"
              }
              mainStyle = {...mainStyle,...st}
            }
          }

            return <Picture key={image.id} image ={image} handleClick = {this.handleClick} id = {image.id} src={image.image} style = {mainStyle}/>

}) }</div>)
    });


    let revealPassword;
    let toggleShowPassword;
    let infor;
    if(!this.props.item.testConditions) {
      revealPassword = <p> Your sequence is: </p>;
      if(!this.state.hidePassword){
        revealPassword = (<div>
                                    <p> Your sequence is: <b> {firstCode} -> {secondCode} -> {thirdCode} -> {forthCode} -> {fifthCode}</b></p>
                                    </div>)
      }
      if(this.state.hidePassword){
        toggleShowPassword = <button onClick ={this.toggleShow} > Show Password </button>
      } else {
        toggleShowPassword = <button onClick ={this.toggleShow} > Hide Password </button>
      }
      infor = (<p> To Enter the password, click the images in the given order: <br />
       Practice as many times as you would like, once you have committed your password to memory, click confirm </p>)

    }



      return (
        <div>
          {revealPassword}
          {toggleShowPassword}
          {infor}

          <input type="password" id="pass" disabled = {true} value ={this.state.value}/>
          <button type="submit" onClick = {this.handleCorrect}>correction  x </button>
          <div className = "row">
          {imageGrid}
          </div>
        </div>
        )
  }
}
