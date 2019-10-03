import React from 'react'

/*
// Tips:

// Get the store's state
store.getState()

// Dispatch changes to the store
// (you won't need to call this but you'll pass it to mapDispatchToProps)
store.dispatch(action)

// subscribe to changes to the store
store.subscribe(() => {})

// unsubscribe from the store
unsubscribe = store.subscribe(() => {})
unsubscribe()
*/

const ReduxContext = React.createContext()

class Provider extends React.Component {
  state = {
    store: this.props.store
  }

  componentDidMount() {
    this.unsubscribe = this.props.store.subscribe(() =>
      this.setState({ store: this.props.store })
    )
  }
  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    return (
      <ReduxContext.Provider value={this.state}>
        {this.props.children}
      </ReduxContext.Provider>
    )
  }
}

const connect = (mapStateToProps, mapDispatchToProps) => {
  return Component => {
    return class extends React.Component {
      render() {
        return (
          <ReduxContext.Consumer>
            {({ store }) => (
              <Component
                {...mapStateToProps(store.getState())}
                {...mapDispatchToProps(store.dispatch)}
              />
            )}
          </ReduxContext.Consumer>
        )
      }
    }
  }
}

export { Provider, connect }
