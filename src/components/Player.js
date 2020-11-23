import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleLeft,
  faAngleRight,
  faPause,
  faPlay,
} from '@fortawesome/free-solid-svg-icons'

const Player = ({
  audioRef,
  currSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
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

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currTime: e.target.value })
  }

  const formatTime = (time) => {
    return Math.floor(time / 60) + ':' + ('0' + Math.floor(time % 60)).slice(-2)
  }

  return (
    <div className='player'>
      <div className='time-control'>
        <p>{formatTime(songInfo.currTime)}</p>
        <input
          type='range'
          min={0}
          max={songInfo.duration || 0}
          value={songInfo.currTime}
          onChange={dragHandler}
        />
        <p>{songInfo.duration ? formatTime(songInfo.duration) : '0:00'}</p>
      </div>
      <div className='play-control'>
        <FontAwesomeIcon className='prev' size='2x' icon={faAngleLeft} />
        <FontAwesomeIcon
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={playHandler}
        />
        <FontAwesomeIcon className='next' size='2x' icon={faAngleRight} />
      </div>
    </div>
  )
}

export default Player
