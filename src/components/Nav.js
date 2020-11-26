import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faMusic, faSun } from '@fortawesome/free-solid-svg-icons'

const Nav = ({ libraryOpen, setLibraryOpen, theme, setTheme }) => {
  const themeHandler = () => {
    setTheme(!theme)
  }

  return (
    <nav>
      <h1>Hallowed Oasis</h1>

      {!theme ? (
        <FontAwesomeIcon
          className='moon'
          size='2x'
          icon={faMoon}
          onClick={themeHandler}
        />
      ) : (
        <FontAwesomeIcon
          className='sun'
          size='2x'
          icon={faSun}
          onClick={themeHandler}
        />
      )}

      <button
        className={theme ? 'dark-theme' : ''}
        onClick={() => setLibraryOpen(!libraryOpen)}
      >
        Library
        <FontAwesomeIcon
          className={`music ${theme ? 'dark-theme' : ''}`}
          icon={faMusic}
        />
      </button>
    </nav>
  )
}

export default Nav
