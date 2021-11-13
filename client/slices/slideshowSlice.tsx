// TODO compléter en s'appuyant sur le tutoriel lié au dessus
import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'
// import type { RootState } from '../store'
import { Slide } from '../type'
// import slides from json file
import data from '../data/slides.json'

// Define a type for the slice state
interface Slides {
    slides: Slide[]
    currentSlide: number
  }

// Define the initial state using that type
const initialState: Slides = {
  slides: data,
  currentSlide: 0
}
export const slideshowSlice = createSlice({
  name: 'slidesApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSlide: {
      reducer: (
        state, action: PayloadAction<number, string, boolean>) => {
        state.currentSlide = action.payload
      },
      prepare (payload: number, meta: boolean) {
        return { payload, meta: meta }
      }
    },
    changeVisibilitySlide: {
      reducer: (state, action: PayloadAction<number, string, boolean>) => {
        state.slides[action.payload].visible = !state.slides[action.payload].visible
      },
      prepare (payload: number, meta: boolean) {
        return { payload, meta: meta }
      }
    },
    nextSlide: (state) => {
      if (state.currentSlide + 1 > state.slides.length - 1) {
        state.currentSlide = 0
      } else {
        state.currentSlide += 1
      }
    },
    previousSlide: (state) => {
      if (state.currentSlide - 1 < 0) {
        state.currentSlide = state.slides.length - 1
      } else {
        state.currentSlide -= 1
      }
    }
  }
})

export const { nextSlide, previousSlide, setSlide, changeVisibilitySlide } = slideshowSlice.actions
export default slideshowSlice.reducer
