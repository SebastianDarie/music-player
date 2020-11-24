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
  setCurrSong,
  isPlaying,
  setIsPlaying,
  songInfo,
  setSongInfo,
  songs,
  setSongs,
}) => {
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
        activeLibraryHandler(songs[currIdx - 1])
        if (isPlaying) audioRef.current.play()
        return
      }
      await setCurrSong(songs[(currIdx - 1) % songs.length])
      activeLibraryHandler(songs[(currIdx - 1) % songs.length])
    }

    if (isPlaying) audioRef.current.play()
  }

  const dragHandler = (e) => {
    audioRef.current.currentTime = e.target.value
    setSongInfo({ ...songInfo, currTime: e.target.value })
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
