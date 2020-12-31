import React from 'react'
import '../index.css'

const Info = ( props ) => {
  if (props.message === null) {
    return null
  }
  return (
    <div className="info">
      {props.message}
    </div>
  )
}
export default Info
