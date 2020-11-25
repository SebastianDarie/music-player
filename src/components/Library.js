import React from 'react'
import LibrarySong from './LibrarySong'

const Library = ({
  audioRef,
  isPlaying,
  libraryOpen,
  songs,
  setCurrSong,
  setSongs,
  theme,
}) => {
  return (
    <div
      className={`library ${
        libraryOpen && theme
          ? 'active-library dark-theme'
          : libraryOpen && !theme
          ? 'active-library'
          : ''
      }`}
    >
      <h2>Library</h2>
      <div className='library-songs'>
        {songs.map((song) => (
          <LibrarySong
            key={song.id}
            audioRef={audioRef}
            id={song.id}
            isPlaying={isPlaying}
            song={song}
            songs={songs}
            setCurrSong={setCurrSong}
            setSongs={setSongs}
          />
        ))}
      </div>
    </div>
  )
}

export default Library
