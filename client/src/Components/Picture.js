import React from 'react';

export default class Picture extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false }
  }
  handleClick() {
    this.setState({hovered: true})
  }

  render() {
    const style1 = {
      cursor: "pointer",
      //transform: `${this.state.hovered ? 'scale(1.05,1.05)': 'scale(1,1)'}`
    }
    return (<img src = {this.props.image.image}
                  alt = "key-pic"
                  id ={this.props.image.id}
                  onClick ={this.props.handleClick}
                  onMouseDown={() => this.setState({hovered: true})}
                  onMouseUp ={() => this.setState({hovered: false})}
                  style={{...this.props.style,...style1}}/>
    )
  }
}
