import React from 'react'
import Select from 'react-select'

export const LabelSelect = (props) => {

  return (
    <Select
      style={props.style}
      defaultValue={ props.issue?props.issue.labels.map((label) => ({
        label:label.text,
        value:label.color
      })):[]}
      options={ props.option}
      isMulti={props.isMulti}
      onChange={props.onChange}
    />
  )
}
