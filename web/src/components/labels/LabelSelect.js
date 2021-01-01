import React from 'react'//{ useState }
import Select from 'react-select'

const LabelSelect = (props) => {

  return (
    <Select
      style={props.style}
      options={ props.option}
      isMulti={props.isMulti}
      onChange={props.onChange}
    />
  )
}

export default LabelSelect