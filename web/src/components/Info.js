import React from 'react'
import '../index.css'
const Info = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="info">
      {message}
    </div>
  )
}

export default Info