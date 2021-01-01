
import React from 'react'
import ColorPicker from 'material-ui-color-picker'

const ColorSelect = (props) => {

  return (
    <div >
      <ColorPicker name='color'
        onChange={(color) =>  {
          color!==undefined?props.setLabelColor(color):
            console.log(color)}} />
    </div>
  )
}

export default ColorSelect
