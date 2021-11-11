import * as React from 'react'
import { isMobile, MobileView } from 'react-device-detect'
import { useParams } from 'react-router'
import { Slide } from '../type'
import AppToolbar from './AppToolbar'

interface Props {
  slides: Slide[];
}

type RouteParams = {
  id: string;
};

const Controller: React.FC<Props> = ({ slides }) => {
  const params = useParams<RouteParams>()
  return (
    <MobileView>
       <ul className="border-2 border-black m-2 p-6 list-disc">
         {slides[Number(params.id)].items?.map((key) => (
          <li key={key}> {key} </li>
         ))}
      </ul>
      <AppToolbar slides={slides} />
    </MobileView>
  )
}

export default Controller
