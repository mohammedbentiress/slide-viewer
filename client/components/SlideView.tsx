import * as React from 'react'
import { Slide } from '../type'

interface Props {
    slide: Slide
}

const SlideView : React.FC<Props> = ({ slide }) => {
  return (
    <div>
        <h1 className="border-2 border-black m-2 p-2 grid-cols-12">{slide.title}</h1>
        <div className="grid grid-cols-2">
          <div>
            <div className="border-2 border-black m-2 p-2">{slide.text}</div>
            <ul className="border-2 border-black m-2 p-6 list-disc">
              {slide.items.map((key) => <li key={key} > {key} </li>)}
            </ul>
          </div>
          <div className="m-2">
            <img src={slide.image}/>
          </div>
        </div>
    </div>
    // <div className={opacity}>
    //   <div className="grid grid-flow-col grid-cols-2 content-center">
    //     <div className="grid-rows-3 gap-1 content-center">
    //       <h1 className="order-1">{slide.title}</h1>
    //       <p className="order-2">{slide.text}</p>
    //       <ul className="order-3 content-center">
    //         {slide.notes.map((key) => <li key={key} >{key}</li>)}
    //       </ul>
    //     </div>
    //     <div className="content-center">
    //       <img className="order-4" src={slide.image}/>
    //     </div>
    //   </div>
    // </div>
  )
}

export default SlideView
