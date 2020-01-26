import React from 'react'
import { Provider } from 'react-redux'
import store from './redux'

import './app.css'

function App({ children }: { children: React.ReactElement}) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default App;
