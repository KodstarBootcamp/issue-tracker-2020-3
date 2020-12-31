
import React from 'react'
import ColorPicker from 'material-ui-color-picker'

const ColorSelect = (props) => {

  return (
    <div >
      <ColorPicker name='color' defaultValue='#000' hideTextfield onChange={color => props.setLabelColor(color)} />
    </div>
  )
}

export default ColorSelect
