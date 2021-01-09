import React from 'react'
import { Button } from 'reactstrap'

const ModelPopup =(props) => {
  return (
    <div className='popup'>
      <div className='popup-inner'>
        <h1>{props.text}</h1>
        <Button color='primary' onClick={props.closePopup}>close me</Button>
      </div>
    </div>
  )
}


export default ModelPopup
