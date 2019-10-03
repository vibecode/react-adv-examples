////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { createBrowserHistory } from 'history'

/*
// create a new history instance
history = createBrowserHistory()

// read the current URL
history.location

// listen for changes to the URL
const unsubscribe = history.listen(() => {
  history.location // is now different
})

// change the URL
history.push('/something')
*/

const RouterContext = React.createContext()

class Router extends React.Component {
  history = createBrowserHistory()

  state = {
    history: this.history
  }

  componentDidMount() {
    this.unsubscribe = this.history.listen(() =>
      this.setState({ history: this.history })
    )
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <RouterContext.Provider value={this.state}>
        {this.props.children}
      </RouterContext.Provider>
    )
  }
}

class Route extends React.Component {
  static contextType = RouterContext

  render() {
    const { path, exact, render, component: Component } = this.props
    const { location } = this.context.history

    const match = exact
      ? location.pathname === path
      : location.pathname.startsWith(path)

    if (match) {
      if (render) {
        return render()
      } else if (Component) {
        return <Component />
      } else {
        return null
      }
    } else {
      return null
    }
  }
}

class Link extends React.Component {
  static contextType = RouterContext

  handleClick = e => {
    e.preventDefault()
    this.context.history.push(this.props.to)
  }

  render() {
    return (
      <a href={`${this.props.to}`} onClick={this.handleClick}>
        {this.props.children}
      </a>
    )
  }
}

export { Router, Route, Link }
