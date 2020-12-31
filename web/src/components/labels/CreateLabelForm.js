import React from 'react'//{ useState }
import Select from 'react-select'

const CreateLabelForm = (props) => {

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

export default CreateLabelForm