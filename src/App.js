import { useEffect, useRef, useState } from 'react'
import Library from './components/Library'
import Nav from './components/Nav'
import Player from './components/Player'
import Song from './components/Song'

import chillHop from './data/data'

import './styles/app.scss'

function App() {
  const [songs, setSongs] = useState(chillHop())
  const [currSong, setCurrSong] = useState(songs[0])
  const [isPlaying, setIsPlaying] = useState(false)
  const [songInfo, setSongInfo] = useState({
    currTime: 0,
    duration: 0,
    animationPercentage: 0,
  })
  const [libraryOpen, setLibraryOpen] = useState(false)
  const [theme, setTheme] = useState(false)
  const [loop, setLoop] = useState(null)

  const audioRef = useRef(null)

  useEffect(() => {
    if (theme) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [theme])

  const timeHandler = (e) => {
    const currTime = e.target.currentTime
    const duration = e.target.duration

    const roundedCurr = Math.round(currTime)
    const roundedDuration = Math.round(duration)
    const animationPercentage = Math.round(
      (roundedCurr / roundedDuration) * 100
    )

    setSongInfo({ ...songInfo, currTime, duration, animationPercentage })
  }

  const activeLibraryHandler = (nextPrev) => {
    const newSongs = songs.map((song) => {
      if (song.id === nextPrev.id) {
        return {
          ...song,
          active: true,
        }
      } else {
        return {
          ...song,
          active: false,
        }
      }
    })

    setSongs(newSongs)
  }

  const endHandler = async () => {
    if (loop === 'repeat') {
      setSongInfo({ ...songInfo, currTime: 0 })
    } else if (loop === 'shuffle') {
      const random = songs[Math.floor(Math.random() * songs.length)]
      await setCurrSong(random)
      activeLibraryHandler(random)
    } else {
      let currIdx = songs.findIndex((song) => song.id === currSong.id)
      await setCurrSong(songs[(currIdx + 1) % songs.length])
      activeLibraryHandler(songs[(currIdx + 1) % songs.length])
    }

    if (isPlaying) audioRef.current.play()
  }

  return (
    <div
      className={`App ${
        libraryOpen && theme
          ? 'library-active dark-theme'
          : libraryOpen && !theme
          ? 'library-active'
          : ''
      }`}
    >
      <Nav
        libraryOpen={libraryOpen}
        setLibraryOpen={setLibraryOpen}
        theme={theme}
        setTheme={setTheme}
      />
      <Song currSong={currSong} isPlaying={isPlaying} />
      <Player
        activeLibraryHandler={activeLibraryHandler}
        audioRef={audioRef}
        currSong={currSong}
        setCurrSong={setCurrSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        loop={loop}
        setLoop={setLoop}
        songInfo={songInfo}
        setSongInfo={setSongInfo}
        songs={songs}
        theme={theme}
      />
      <Library
        audioRef={audioRef}
        isPlaying={isPlaying}
        libraryOpen={libraryOpen}
        songs={songs}
        setCurrSong={setCurrSong}
        setSongs={setSongs}
        theme={theme}
      />

      <audio
        src={currSong.audio}
        ref={audioRef}
        onEnded={endHandler}
        onLoadedMetadata={timeHandler}
        onTimeUpdate={timeHandler}
      ></audio>
    </div>
  )
}

export default App
