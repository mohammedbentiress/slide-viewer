import * as React from 'react'
import ReactLogo from '../../images/react.png'
import NodejsLogo from '../../images/Nodejs.png'
import webpackLogo from '../../images/webpack.png'

export default function Content () {
  return (
    <div>
      <img src={ReactLogo} alt='ReactLogo'/>
      <img src={NodejsLogo} alt='NodejsLogo'/>
      <img src={webpackLogo} alt='WebpackLogo'/>
    </div>
  )
}
