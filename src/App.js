import './index.css'
import React, { Component } from 'react'
import { FaPlay } from 'react-icons/fa'
import { FaPause } from 'react-icons/fa'
import { FaForward } from 'react-icons/fa'
import { FaBackward } from 'react-icons/fa'

class RadioGroup extends Component {
  render() {
    return (
      <fieldset className="radio-group">
        <legend>{this.props.legend}</legend>
        {this.props.children}
      </fieldset>
    )
  }
}

class RadioButton extends Component {
  render() {
    const isActive = false // <-- should come from somewhere
    const className = 'radio-button ' + (isActive ? 'active' : '')
    return <button className={className}>{this.props.children}</button>
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <RadioGroup legend="Radio Group">
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
