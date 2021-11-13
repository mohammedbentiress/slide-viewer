import * as React from 'react'
import SlideShow from './SlideShow'
import AppToolbar from './AppToolbar'
import { Switch, Route, Redirect } from 'react-router'
import { RootState, store } from '../store'
import { useAppDispatch, useAppSelector } from '../hooks'
import { setSlide } from '../slices/slideshowSlice'
import { isMobile } from 'react-device-detect'
import Controller from './Controller'
import Present from './Present'

const App: React.FC = () => {
  const state = useAppSelector((state: RootState) => state.slideReducer)
  const dispatch = useAppDispatch()
  type RouteParams = {
    id: string;
  };
  const css = `
    .container {
        min-width:100% !important;
      }
    .cont{
      overflow:hidden;
    }
    @media screen and (max-width: 640px) {
        .cont {
          padding: 10px;
      }
    }
    `

  window.onpopstate = function (event) {
    // console.log(
    //   'location: ' +
    //     document.location +
    //     ', state: ' +
    //     JSON.stringify(state.currentSlide)
    // )
    const currentSlide = Number(window.location.href.split('/')[5])
    dispatch(setSlide(currentSlide, true))
  }

  const url = isMobile ? 'controller' : 'edit'
  const hash = '#/' + url + '/' + state.currentSlide
  if (location.hash !== hash) {
    // console.log(hash)
    window.location.hash = hash
    // Force scroll to top this is what browsers normally do when
    // navigating by clicking a link.
    // Without this, scroll stays wherever it was which can be quite odd.
    document.body.scrollTop = 0
  }

  return (
    <Switch>
      {isMobile
        ? (
          <Route exact
          path="/controller/:id"
          render={() => <Controller slides={state.slides} />}
        />
          )
        : (
      <Route exact path="/edit/:id" render={() => (
        <div className="cont h-screen .bg-gray-200 flex justify-center items-center sm:p-6">
          <style>{css}</style>
          <div className="border-2 border-black">
            <SlideShow slides={state.slides} />
            <AppToolbar slides={state.slides} />
          </div>
        </div>
      )} />
          )
      }

      <Route exact path="/present/:id" render={
        () => (
          <Present slides={state.slides}/>
        )}/>
      <Route exact path="*">
      {isMobile
        ? (
          <Redirect to="/controller/0" />
          )
        : (
          <Redirect to="/edit/0" />
          )
      }
      </Route>
    </Switch>
  )
}

export default App
