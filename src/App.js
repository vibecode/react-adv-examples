/*
- Make the Play button work
- Make the Pause button work
- Disable the play button if it's playing
- Disable the pause button if it's not playing
- Make the PlayPause button work
- Make the JumpForward button work
- Make the JumpBack button work
- Make the progress bar work
  - change the width of the inner element to the percentage of the played track
  - add a click handler on the progress bar to jump to the clicked spot

Here is the audio API you'll need to use, `audio` is the <audio/> dom nod
instance, you can access it as `this.audio` in `AudioPlayer`

```js
// play/pause
audio.play()
audio.pause()

// change the current time
audio.currentTime = audio.currentTime + 10
audio.currentTime = audio.currentTime - 30

// know the duration
audio.duration

// values to calculate relative mouse click position
// on the progress bar
event.clientX // left position *from window* of mouse click
const rect = node.getBoundingClientRect()
rect.left // left position *of node from window*
rect.width // width of node
```

Other notes about the `<audio/>` tag:

- You can't know the duration until `onLoadedData`
- `onTimeUpdate` is fired when the currentTime changes
- `onEnded` is called when the track plays through to the end and is no
  longer playing

Good luck!
*/

import './index.css'
import React from 'react'
import * as PropTypes from 'prop-types'
import podcast from './podcast.mp3'
import mario from './mariobros.mp3'
import { FaPause } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { FaRedo } from 'react-icons/fa'
import { FaUndo } from 'react-icons/fa'

const Context = React.createContext()

class AudioPlayer extends React.Component {
  setTime = time => this.setState({ audio: { currentTime: time } })
  jump = by =>
    this.setState(state => ({
      audio: {
        currentTime: state.audio.currentTime + by
      }
    }))
  play = () => {
    this.setState({ audio: { isPlaying: true } })
    this.audio.play()
  }
  pause = () => {
    this.setState({ audio: { isPlaying: false } })
    this.audio.pause()
  }

  state = {
    audio: {
      isPlaying: false,
      duration: null,
      currentTime: 0,
      loaded: false,
      play: this.play,
      pause: this.pause,
      setTime: this.setTime,
      jump: this.jump
    }
  }

  render() {
    return (
      <div className="audio-player">
        <audio
          src={this.props.source}
          onTimeUpdate={null}
          onLoadedData={null}
          onEnded={null}
          ref={n => (this.audio = n)}
        />
        <Context.Provider value={this.state}>
          {this.props.children}
        </Context.Provider>
      </div>
    )
  }
}

class Play extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ audio }) => (
          <button
            className="icon-button"
            onClick={audio.play}
            disabled={null}
            title="play"
          >
            <FaPlay />
          </button>
        )}
      </Context.Consumer>
    )
  }
}

class Pause extends React.Component {
  render() {
    return (
      <button
        className="icon-button"
        onClick={null}
        disabled={null}
        title="pause"
      >
        <FaPause />
      </button>
    )
  }
}

class PlayPause extends React.Component {
  render() {
    return null
  }
}

class JumpForward extends React.Component {
  render() {
    return (
      <button
        className="icon-button"
        onClick={null}
        disabled={null}
        title="Forward 10 Seconds"
      >
        <FaRedo />
      </button>
    )
  }
}

class JumpBack extends React.Component {
  render() {
    return (
      <button
        className="icon-button"
        onClick={null}
        disabled={null}
        title="Back 10 Seconds"
      >
        <FaUndo />
      </button>
    )
  }
}

class Progress extends React.Component {
  render() {
    return (
      <div className="progress" onClick={null}>
        <div
          className="progress-bar"
          style={{
            width: '23%'
          }}
        />
      </div>
    )
  }
}

const Exercise = () => (
  <div className="exercise">
    <AudioPlayer source={mario}>
      <Play /> <Pause /> <span className="player-text">Mario Bros. Remix</span>
      <Progress />
    </AudioPlayer>

    <AudioPlayer source={podcast}>
      <PlayPause /> <JumpBack /> <JumpForward />{' '}
      <span className="player-text">
        React30 Episode 010: React Virtualized
      </span>
      <Progress />
    </AudioPlayer>
  </div>
)

export default Exercise
