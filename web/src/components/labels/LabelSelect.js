import React from 'react'//{ useState }
import Select from 'react-select'

const LabelSelect = (props) => {

  return (
    <div style={props.style}>
      <Select
        options={ props.option}
        isMulti={props.isMulti}
        onChange={props.onChange}
      />
    </div>
  )
}

export default LabelSelect