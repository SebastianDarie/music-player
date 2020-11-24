import React, { useEffect } from 'react'
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
  setCurrSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
  useEffect(() => {
    const newSongs = songs.map((song) => {
      if (song.id === currSong.id) {
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

    //eslint-disable-next-line
  }, [currSong])

  const playHandler = () => {
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const skipHandler = (direction) => {
    let currIdx = songs.findIndex((song) => song.id === currSong.id)
    if (direction === 'next') {
      setCurrSong(songs[(currIdx + 1) % songs.length])
    }
    if (direction === 'back') {
      if ((currIdx - 1) % songs.length === -1) {
        setCurrSong(songs[songs.length - 1])
        return
      }
      setCurrSong(songs[(currIdx - 1) % songs.length])
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
        <FontAwesomeIcon
          className='prev'
          size='2x'
          icon={faAngleLeft}
          onClick={() => skipHandler('back')}
        />
        <FontAwesomeIcon
          className='play'
          size='2x'
          icon={isPlaying ? faPause : faPlay}
          onClick={playHandler}
        />
        <FontAwesomeIcon
          className='next'
          size='2x'
          icon={faAngleRight}
          onClick={() => skipHandler('next')}
        />
      </div>
    </div>
  )
}

export default Player
