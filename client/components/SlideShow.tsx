import * as React from 'react'
import SlideView from './SlideView'
import { Slide } from '../type'

interface Props {
  slides: Slide[];
  currentSlide: number
}

const SlideShow: React.FC<Props> = ({ slides, currentSlide }) => {
  const isVisible = slides[currentSlide].visible
  const opacity: string = isVisible ? 'opacity-100' : 'opacity-10'

  return (
    <div className={opacity}>
      <SlideView slide={slides[currentSlide]} currentSlide={currentSlide}></SlideView>
    </div>
  )
}

export default SlideShow
