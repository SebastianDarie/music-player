import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
  faRandom,
  faRedo,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
  activeLibraryHandler,
  audioRef,
  currSong,
  setCurrSong,
  isPlaying,
  setIsPlaying,
  loop,
  setLoop,
  songInfo,
  setSongInfo,
  songs,
  theme,
}) => {
  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const skipHandler = async (direction) => {
    let currIdx = songs.findIndex((song) => song.id === currSong.id)
    if (direction === 'next') {
      await setCurrSong(songs[(currIdx + 1) % songs.length])
      activeLibraryHandler(songs[(currIdx + 1) % songs.length])
    }
    if (direction === 'back') {
      if ((currIdx - 1) % songs.length === -1) {
        await setCurrSong(songs[songs.length - 1])
        activeLibraryHandler(songs[songs.length - 1])
        if (isPlaying) audioRef.current.play()
        return
      }
      await setCurrSong(songs[(currIdx - 1) % songs.length])
      activeLibraryHandler(songs[(currIdx - 1) % songs.length])
    }

    if (isPlaying) audioRef.current.play()
  }

  const loopHandler = (type) => {
    if (loop === type) {
      setLoop(null)
    } else {
      setLoop(type)
    }
  }

  const hoverColor = (e) => {
    e.target.parentNode.style.color = currSong.color[1]
  }

  const removeColor = (e) => {
    e.target.parentNode.style.color = ''
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currTime: parseInt(e.target.value) })
  }

  const formatTime = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  const trackAnim = {
    transform: `translateX(${songInfo.animationPercentage}%)`,
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{formatTime(songInfo.currTime)}</p>
        <div
          className='track'
          style={{
            background: `linear-gradient(to right, ${currSong.color[0]}, ${currSong.color[1]})`,
          }}
        >
          <input
            type='range'
            min={0}
            max={songInfo.duration || 0}
            value={songInfo.currTime}
            onChange={dragHandler}
          />
          <div className='animate-track' style={trackAnim}></div>
        </div>

        <p>{songInfo.duration ? formatTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <div className='shuffle'>
          <FontAwesomeIcon
            size='1x'
            icon={faRandom}
            color={loop === 'shuffle' ? currSong.color[0] : ''}
            onClick={() => loopHandler('shuffle')}
            onMouseOver={hoverColor}
            onMouseOut={removeColor}
          />
        </div>

        <FontAwesomeIcon
          className={`prev ${theme ? 'dark-theme' : ''}`}
          size='2x'
          icon={faAngleLeft}
          onClick={() => skipHandler('back')}
        />
        <FontAwesomeIcon
          className={`play ${theme ? 'dark-theme' : ''}`}
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={playHandler}
        />
        <FontAwesomeIcon
          className={`next ${theme ? 'dark-theme' : ''}`}
          size='2x'
          icon={faAngleRight}
          onClick={() => skipHandler('next')}
        />
        <div className='repeat'>
          <FontAwesomeIcon
            size='1x'
            icon={faRedo}
            color={loop === 'repeat' ? currSong.color[0] : ''}
            onClick={() => loopHandler('repeat')}
            onMouseOver={hoverColor}
            onMouseOut={removeColor}
          />
        </div>
      </div>
    </div>
  )
}

export default Player
