import React from 'react'
import '../index.css'

export const Info = ( props ) => {
  if (props.info === null) {
    return null
  }
  return (
    <div className="info">
      {props.info}
    </div>
  )

}

export const Error = ( props ) => {
  if (props.error === null) {
    return null
  }
  return (
    <div className="error">
      {props.error}
    </div>
  )
}

