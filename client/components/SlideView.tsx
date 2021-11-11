import * as React from 'react'
import { isMobile } from 'react-device-detect'
import { useHistory } from 'react-router'
import { Slide } from '../type'

interface Props {
  slide: Slide;
}

const SlideView: React.FC<Props> = ({ slide }) => {
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
    document.addEventListener('keydown', function (e) {
      console.log(e.key)
      if (e.key === 'Escape') {
        e.preventDefault()
        console.log('escape clicked 1')
        if (document.fullscreenElement) {
          console.log('escape clicked 2')
          document.exitFullscreen()
            .then(() => console.log('Document Exited from Full screen mode'))
            .catch((err) => console.error(err))
        } else {
          document.documentElement.requestFullscreen()
        }
      }
    }, false)
  })
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
