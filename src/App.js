import './index.css'
import React, { Component } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { FaForward } from 'react-icons/fa'
import { FaBackward } from 'react-icons/fa'

class RadioGroup extends Component {
  state = {
    value: this.props.defaultValue
  }

  render() {
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {React.Children.map(this.props.children, child => {
          return React.cloneElement(child, {
            isActive: this.state.value === child.props.value,
            onClick: value => {
              this.setState({
                value: child.props.value
              })
            }
          })
        })}
      </fieldset>
    )
  }
}

class RadioButton extends Component {
  render() {
    const { isActive, children } = this.props
    const className = 'radio-button ' + (isActive ? 'active' : '')
    return (
      <button className={className} onClick={this.props.onClick}>
        {children}
      </button>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup legend="Radio Group" defaultValue={'pause'}>
          <RadioButton value="back">
            <FaBackward />
          </RadioButton>
          <RadioButton value="play">
            <FaPlay />
          </RadioButton>
          <RadioButton value="pause">
            <FaPause />
          </RadioButton>
          <RadioButton value="forward">
            <FaForward />
          </RadioButton>
        </RadioGroup>
      </div>
    )
  }
}

export default App
