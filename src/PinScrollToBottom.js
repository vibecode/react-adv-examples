import { Component } from 'react'

export default class PinScrollToBottom extends Component {
  componentDidMount() {
    this.scroll()
  }

  componentDidUpdate(pp, ps, snapshot) {
    if (!snapshot) {
      this.scroll()
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement

    return (this.scrolledUp = scrollTop + clientHeight < scrollHeight)
  }

  scroll() {
    window.scrollTo(0, document.documentElement.scrollHeight)
  }

  render() {
    return this.props.children
  }
}
