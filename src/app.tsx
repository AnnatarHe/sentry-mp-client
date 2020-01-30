import React from 'react'
import { Provider } from 'react-redux'
import  promisedFinally from 'promise.prototype.finally'
import store from './redux'
import './app.css'

promisedFinally.shim()

function App({ children }: { children: React.ReactElement}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default App;
