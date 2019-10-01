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
import podcast from './podcast.mp3'
import mario from './mariobros.mp3'
import { FaPause } from 'react-icons/fa'
import { FaPlay } from 'react-icons/fa'
import { FaRedo } from 'react-icons/fa'
import { FaUndo } from 'react-icons/fa'

const Context = React.createContext()

class AudioPlayer extends React.Component {
  setTime = time => {
    this.audio.currentTime = time
  }

  jump = by => {
    this.audio.currentTime = this.audioCtx.currentTime + by
  }

  play = () => {
    const { audioCtx } = this
    audioCtx.isPlaying = true
    this.setState({ audioCtx })
    this.audio.play()
  }
  pause = () => {
    const { audioCtx } = this
    audioCtx.isPlaying = false
    this.setState({ audioCtx })
    this.audio.pause()
  }

  handleTimeUpdate = e => {
    const { audioCtx } = this
    audioCtx.currentTime = this.audio.currentTime
    audioCtx.duration = this.audio.duration
    this.setState({ audioCtx })
  }

  handleAudioLoaded = e => {
    const { audioCtx } = this
    audioCtx.duration = this.audio.duration
    audioCtx.loaded = true
    this.setState({ audioCtx })
  }

  handleEnded = () => {
    const { audioCtx } = this
    audioCtx.isPlaying = false
    this.setState({ audioCtx })
  }

  audioCtx = {
    isPlaying: false,
    duration: null,
    currentTime: 0,
    loaded: false,
    play: this.play,
    pause: this.pause,
    setTime: this.setTime,
    jump: this.jump
  }

  state = { audioCtx: this.audioCtx }

  render() {
    return (
      <div className="audio-player">
        <audio
          src={this.props.source}
          onTimeUpdate={this.handleTimeUpdate}
          onLoadedData={this.handleAudioLoaded}
          onEnded={this.handleEnded}
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
        {({ audioCtx }) => (
          <button
            className="icon-button"
            onClick={audioCtx.play}
            disabled={audioCtx.isPlaying}
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
      <Context.Consumer>
        {({ audioCtx }) => (
          <button
            className="icon-button"
            onClick={audioCtx.pause}
            disabled={!audioCtx.isPlaying}
            title="pause"
          >
            <FaPause />
          </button>
        )}
      </Context.Consumer>
    )
  }
}

class PlayPause extends React.Component {
  static contextType = Context

  render() {
    const { isPlaying } = this.context.audioCtx
    return isPlaying ? <Pause /> : <Play />
  }
}

class JumpForward extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ audioCtx }) => (
          <button
            className="icon-button"
            onClick={() => audioCtx.jump(10)}
            disabled={!audioCtx.isPlaying}
            title="Forward 10 Seconds"
          >
            <FaRedo />
          </button>
        )}
      </Context.Consumer>
    )
  }
}

class JumpBack extends React.Component {
  render() {
    return (
      <Context.Consumer>
        {({ audioCtx }) => (
          <button
            className="icon-button"
            onClick={() => audioCtx.jump(-10)}
            disabled={!audioCtx.isPlaying}
            title="Back 10 Seconds"
          >
            <FaUndo />
          </button>
        )}
      </Context.Consumer>
    )
  }
}

class Progress extends React.Component {
  static contextType = Context

  handleClick = e => {
    const { audioCtx } = this.context
    const rect = this.node.getBoundingClientRect()
    const relativeLeft = e.clientX - rect.left
    audioCtx.setTime((relativeLeft / rect.width) * audioCtx.duration)
  }

  render() {
    const { loaded, duration, currentTime } = this.context.audioCtx
    return (
      <div
        className="progress"
        ref={n => (this.node = n)}
        onClick={this.handleClick}
      >
        <div
          className="progress-bar"
          style={{
            width: loaded ? `${(currentTime / duration) * 100}%` : '0%'
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
