/*
Create a `withStorage` higher order component that manages saving and retrieving
the `sidebarIsOpen` state to local storage
*/

import './index.css'
import React from 'react'
import { MdMenu } from 'react-icons/md'
import { set, get, subscribe } from './local-storage'

const withStorage = (storageKey, default_) => Component => {
  return class extends React.Component {
    //allows to unit test wrapped component
    static WrappedComponent = Component

    state = {
      [storageKey]: get(storageKey, default_)
    }

    componentDidMount() {
      this.unsubscribe = subscribe(() => {
        this.setState({
          [storageKey]: get(storageKey)
        })
      })
    }

    componentWillUnmount() {
      this.unsubscribe()
    }

    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          setStorage={value => set(storageKey, value)}
        />
      )
    }
  }
}

class App extends React.Component {
  render() {
    const { sidebarIsOpen, setStorage } = this.props
    return (
      <div className="app">
        <header>
          <button
            className="sidebar-toggle"
            title="Toggle menu"
            onClick={() => {
              setStorage(!sidebarIsOpen)
            }}
          >
            <MdMenu />
          </button>
        </header>

        <div className="container">
          <aside className={sidebarIsOpen ? 'open' : 'closed'} />
          <main />
        </div>
      </div>
    )
  }
}

export default withStorage('sidebarIsOpen', true)(App)
