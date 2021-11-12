import { AnyAction, configureStore, Dispatch, Middleware, Store } from '@reduxjs/toolkit'
import { io } from 'socket.io-client'

import slideshowReducer, { setSlide } from './slices/slideshowSlice' // chemin à adapter

// Custome middleware
const myLoggerMiddleware: Middleware<Dispatch> = (store: Store) => (next) => {
  return (action: AnyAction) => {
    console.log('State Before:', store.getState())
    return next(action)
  }
}

// on se connecte au serveur
const socket = io()

export const propagateSocketMiddleware: Middleware<Dispatch> =
  () => (next) => (action: AnyAction) => {
    // Explorez la structure de l'objet action :
    console.log('propagateSocketMiddleware', action)

    // TODO traiter et propager les actions au serveur.
    // Vous pourrez utiliser
    if (action.meta) {
      socket.emit('action', action)
    }

    // Après diffusion au serveur on fait suivre l'action au prochain middleware
    next(action)
  }

export const recieveSocketMiddleware: Middleware<Dispatch> =
  (store: Store) => (next) => (action: AnyAction) => {
    socket.on('action', (msg) => {
      console.log('action recived: ', msg.payload)
      switch (
        msg.type // ajuster le msg.type pour qu'il corresponde bien à celui dédifit pour l'action votre reducer
      ) {
        case 'slidesApp/setSlide': // <- probablement autre chose à vous de trouver
          console.log('from inside', msg.payload)
          store.dispatch(setSlide(msg.payload, false))
          break
      }
    })

    next(action)
  }

export const store = configureStore({
  reducer: {
    slideReducer: slideshowReducer
  },
  middleware: [myLoggerMiddleware, propagateSocketMiddleware, recieveSocketMiddleware]
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
