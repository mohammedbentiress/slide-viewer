import * as React from 'react'
import { Slide } from '../type'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../store'
import { changeVisibilitySlide } from '../slices/slideshowSlice'
import { useParams } from 'react-router'

interface Props {
    slides: Slide[]
}

type RouteParams = {
  id: string;
};

const AppToolbar: React.FC<Props> = ({ slides }) => {
  // dans votre composant on branche le dispatch au store :
  const dispatch = useDispatch<AppDispatch>()
  const currentSlide = Number((useParams<RouteParams>()).id)
  // lors du click sur le bouton
  return (
        <div>
            <button>left</button>
            <button>right</button>
            <button onClick ={() => {
              dispatch(
                changeVisibilitySlide(
                  currentSlide
                )
              )
            }}>Visible</button>
        </div>
  )
}

export default AppToolbar
