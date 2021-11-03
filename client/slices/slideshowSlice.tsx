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
export const slideshowSlice:any = createSlice({
  name: 'slidesApp',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    nextSlide: (state) => {
      // TODO
      state.currentSlide += 1
    },
    previousSlide: (state) => {
      // TODO
      state.currentSlide -= 1
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSlide: (state, action: PayloadAction<number>) => {
      // TODO à adapter au besoin
      state.currentSlide = action.payload
    },
    changeVisibilitySlide: (state, action: PayloadAction<number>) => {
      // TODO changer la propriété visible de true à false et inversement
      console.log('change visibility for ' + action.payload)
      console.log(current(state))
      state.slides.map((index) => {
        if (state.slides.indexOf(index) === action.payload) { index.visible = !index.visible }
        return index
      })
    }

  }
})

export const { nextSlide, previousSlide, setSlide, changeVisibilitySlide } = slideshowSlice.actions
export default slideshowSlice.reducer
