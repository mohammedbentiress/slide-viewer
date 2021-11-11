import * as React from 'react'
import { isMobile, MobileView } from 'react-device-detect'
import { useParams } from 'react-router'
import { Slide } from '../type'
import AppToolbar from './AppToolbar'
import SlideView from './SlideView'

interface Props {
  slides: Slide[];
}

type RouteParams = {
  id: string;
};

const Present: React.FC<Props> = ({ slides }) => {
  const params = useParams<RouteParams>()
  const slide = slides[Number(params.id)]
  return (
      <div>
          <SlideView slide={slide}/>
      </div>
  )
}

export default Present
