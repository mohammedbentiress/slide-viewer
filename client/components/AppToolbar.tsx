import * as React from 'react'
import { Slide } from '../type'
import { changeVisibilitySlide, nextSlide, previousSlide, setSlide } from '../slices/slideshowSlice'
import { useParams } from 'react-router'
import { useAppDispatch } from '../hooks'

interface Props {
    slides: Slide[]
}

type RouteParams = {
  id: string;
};

const AppToolbar: React.FC<Props> = ({ slides }) => {
  // add css style
  const css = `
    .dropdown:hover .dropdown-menu {
        display: block;
        overflow: scroll;
        height: 150px
      }
    }  
    .dropdown{
        overflow: auto;
        overflow-x: hidden;

    }
    input:checked ~ .dot {
        transform: translateX(100%);
        background-color: #48bb78;
    }
    @media screen and (max-width: 640px) {
      .apptoolbar {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }
    `
  // dans votre composant on branche le dispatch au store :
  const dispatch = useAppDispatch()
  const currentSlide = Number((useParams<RouteParams>()).id)

  // lors du click sur le bouton
  return (
    <div className="apptoolbar border-2 border-black p-2 border-b-0 border-r-0 border-l-0 grid grid-cols-3 text-right">
    <style>
    {css}
    </style>
    <div className=" inline-flex float-right flex items-center justify-center w-full">
         <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-l" onClick = {() => {
           dispatch(
             previousSlide()
           )
         }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
         </button>
         <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-r" onClick = {() => {
           dispatch(
             nextSlide()
           )
         }}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
        </button>
     </div>

    <div className="p-2">

        <div className="dropdown inline-block relative">
        <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
            <span className="mr-1"></span>
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/> </svg>
        </button>
        <ul className="dropdown-menu absolute hidden text-gray-700 pt-1">
          {slides.map((key, number) => <li key={number} > <a onClick ={() => {
            dispatch(
              setSlide(
                number
              )
            )
          }} className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap">{number} </a> </li>)}
        </ul>
        </div>

    </div>
    <div className="flex items-center justify-center w-full">

        <label
            htmlFor="toogleA"
            className="flex items-center cursor-pointer"
        >
            <div className="relative">
            <input id="toogleA" type="checkbox" className="sr-only" onClick ={() => {
              dispatch(
                changeVisibilitySlide(
                  currentSlide
                )
              )
            }}/>
            <div className="w-10 h-4 bg-gray-400 rounded-full shadow-inner"></div>
            <div className="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"></div>
            </div>
            <div className="ml-3 text-gray-700">
                Visible
            </div>
        </label>

    </div>

  </div>

  // <div>
  //     <button>left</button>
  //     <button>right</button>
  //     <button onClick ={() => {
  //       dispatch(
  //         changeVisibilitySlide(
  //           currentSlide
  //         )
  //       )
  //     }}>Visible</button>
  // </div>
  )
}

export default AppToolbar
