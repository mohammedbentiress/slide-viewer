import * as React from 'react'
import * as ReactDOM from 'react-dom'
import Header from './components/Header/index.tsx'
import Content from './components/Content/index.tsx'

const Index = () => {
  return (
    <div className='container'>
      <Header />
      <Content />
    </div>
  )
}
ReactDOM.render(<Index />, document.getElementById('root'))
