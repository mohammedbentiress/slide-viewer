import * as React from 'react'
import SlideShow from './SlideShow'
import AppToolbar from './AppToolbar'
import { Switch, Route } from 'react-router'
import { store } from '../store'

const App: React.FC = () => {
  const data = store.getState().slides
  const [slides] = React.useState(data)
  return (
    <Switch>
      <Route
      path="/:id"
      render={() => (
        <div>
          <SlideShow slides={slides} />
          <AppToolbar slides={slides} />
        </div>
      )}
      />
    </Switch>
  )
}

export default App
