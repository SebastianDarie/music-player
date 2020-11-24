import React from 'react'

const Song = ({ currSong, isPlaying }) => {
  return (
    <div className='song-container'>
      <img
        src={currSong.cover}
        alt={currSong.name}
        className={isPlaying ? 'rotateSong' : ''}
      />
      <h2>{currSong.name}</h2>
      <h3>{currSong.artist}</h3>
    </div>
  )
}

export default Song
