import * as React from 'react'
import SlideView from './SlideView'
import { useParams } from 'react-router-dom'
import { Slide } from '../type'

interface Props {
    slides: Slide[]
}

type RouteParams = {
  id: string;
};

const SlideShow : React.FC<Props> = ({ slides }) => {
  const params = useParams<RouteParams>()

  return (
        <SlideView slide = { slides[Number(params.id)]}></SlideView>
  )
}

export default SlideShow
