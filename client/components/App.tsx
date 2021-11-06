import * as React from 'react'
import SlideShow from './SlideShow'
import AppToolbar from './AppToolbar'
import { Switch, Route, useHistory, useParams } from 'react-router'
import { RootState, store } from '../store'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setSlide } from '../slices/slideshowSlice'
import { current } from 'immer'

const App: React.FC = () => {
  const state = useAppSelector(
    (state: RootState) => state.slideReducer
  )
  const dispatch = useAppDispatch()
  type RouteParams = {
    id: string;
  };

  // window.onpopstate = function (event) {
  //   console.log('location: ' + document.location + ', state: ' + JSON.stringify(state.currentSlide))
  //   const currentSlide = Number((useParams<RouteParams>()).id)
  //   dispatch(
  //     setSlide(
  //       currentSlide
  //     )
  //   )
  // }

  const hash = '#/' + state.currentSlide
  if (location.hash !== hash) {
    console.log(hash)
    window.location.hash = hash
    // Force scroll to top this is what browsers normally do when
    // navigating by clicking a link.
    // Without this, scroll stays wherever it was which can be quite odd.
    document.body.scrollTop = 0
  }

  return (
    <Switch>
      <Route
      path="/:id"
      render={() => (
        <div className="h-screen bg-gray-200 flex px-96 justify-center items-center mb-15">
          <div className="border-2 border-black">
            <SlideShow slides={state.slides} />
            <AppToolbar slides={state.slides} />
          </div>
        </div>
      )}
      />
    </Switch>
  )
}

export default App
