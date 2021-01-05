import React from 'react'
import Select from 'react-select'

export const LabelSelect = (props) => {

  return (
    <Select
      style={props.style}
      options={ props.option}
      isMulti={props.isMulti}
      onChange={props.onChange}
    />
  )
}
