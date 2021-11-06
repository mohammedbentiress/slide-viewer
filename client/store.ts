import { configureStore } from '@reduxjs/toolkit'
import slideshowReducer from './slices/slideshowSlice' // chemin à adapter

export const store = configureStore({
  reducer: {
    slideReducer: slideshowReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
