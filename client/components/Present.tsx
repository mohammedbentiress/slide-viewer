import * as React from 'react'
import { Slide } from '../type'
import SlideView from './SlideView'

interface Props {
  slides: Slide[];
  currentSlide: number
}

const Present: React.FC<Props> = ({ slides, currentSlide }) => {
  const slide = slides[currentSlide]
  return <SlideView slide={slide} currentSlide={currentSlide}/>
}

export default Present
