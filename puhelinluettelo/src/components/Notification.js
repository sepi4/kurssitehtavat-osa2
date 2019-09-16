import React from 'react'

import '../index.css'

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }

  const display = () => {
    if (message) {
      return <div className="message">
        {message}
      </div>
    }
    return <div className="error">
      {error}
    </div>
  }

  return (display())
}

export default Notification 
