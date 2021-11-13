import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'
import App from './components/App'
import './style.css'
import { Provider } from 'react-redux'
import { store } from './store' // verifiez que le chemin est correct

declare global {
    interface Window {
        mystore: unknown
    }
}
window.mystore = store

const Index = () => {
  return (
    <Provider store={store}>
      <div style={ { height: '100%' } } className='container'>
          <HashRouter ><App /></HashRouter >
      </div>
    </Provider>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'))
