import * as React from 'react'
import { useHistory, useParams } from 'react-router'
import { Slide } from '../type'

interface Props {
  slide: Slide;
  currentSlide: number;
}

const SlideView: React.FC<Props> = ({ slide, currentSlide }) => {
  const history = useHistory()
  const toggleFullscreen = () => {
    const elem = document.querySelector('.fullscreen')
    if (!document.fullscreenElement) {
      elem.requestFullscreen().catch((err) => {
        alert(
          `Error attempting to enable full-screen mode: ${err.message} (${err.name})`
        )
      })
    }
  }

  React.useEffect(() => {
    if (location.hash.includes('present')) {
      toggleFullscreen()
    }
  })

  // Back to edit page when the user quit the present mode
  document.addEventListener('fullscreenchange', function (e) {
    if (document.fullscreenElement) {
      console.log(`Element: ${document.fullscreenElement.id} entered full-screen mode.`)
    } else {
      history.push('/edit/' + currentSlide)
    }
  }, false)

  return (
    <div className="fullscreen bg-gray-200">
      <h1 className="border-2 border-black m-2 p-2 grid-cols-12">
        {slide.title}
      </h1>
      {slide.type === 'content' && (
        <div className="grid grid-cols-2">
          <div>
            <div className="border-2 border-black m-2 p-2">{slide.text}</div>
            <ul className="border-2 border-black m-2 p-6 list-disc">
              {slide.items.map((key) => (
                <li key={key}> {key} </li>
              ))}
            </ul>
          </div>
          <div className="m-2">
            <img src={slide.image} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SlideView
