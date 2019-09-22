import './index.css'
import React, { Component } from 'react'
import subscribeToMessages from './messages'
import FadeIn from './FadeIn'
import PinScrollToBottom from './PinScrollToBottom'

class App extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    subscribeToMessages(message => {
      this.setState({
        messages: this.state.messages.concat([message])
      })
    })
  }

  render() {
    const { messages } = this.state

    return (
      <ol className="app">
        <div className="link">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k"
          >
            Sketch on YouTube
          </a>
        </div>
        <PinScrollToBottom>
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${message.avatar})` }}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </ol>
    )
  }
}

export default App
