import * as React from 'react'
import { store } from '../store'
import { Slide } from '../type'

interface Props {
    slide: Slide
}

const SlideView : React.FC<Props> = ({ slide }) => {
  const isVisible = store.getState().slides[store.getState().currentSlide].visible
  console.log(isVisible)
  const opacity: string = isVisible ? 'opacity-100' : 'opacity-10'
  console.log(opacity)

  return (
    <div className={opacity}>
      <div className="grid grid-flow-col grid-cols-2 content-center">
        <div className="grid-rows-3 gap-1 content-center">
          <h1 className="order-1">{slide.title}</h1>
          <p className="order-2">{slide.text}</p>
          <ul className="order-3 content-center">
            {slide.notes.map((key) => <li key={key} >{key}</li>)}
          </ul>
        </div>
        <div className="content-center">
          <img className="order-4" src={slide.image}/>
        </div>
      </div>
    </div>

  )
}

export default SlideView
