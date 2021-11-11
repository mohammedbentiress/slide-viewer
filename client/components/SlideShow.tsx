import * as React from 'react'
import SlideView from './SlideView'
import { useParams } from 'react-router-dom'
import { Slide } from '../type'

interface Props {
  slides: Slide[];
}

type RouteParams = {
  id: string;
};

const SlideShow: React.FC<Props> = ({ slides }) => {
  const params = useParams<RouteParams>()

  const isVisible = slides[Number(params.id)].visible
  const opacity: string = isVisible ? 'opacity-100' : 'opacity-10'

  return (
    <div className={opacity}>
      <SlideView slide={slides[Number(params.id)]}></SlideView>
    </div>
  )
}

export default SlideShow
