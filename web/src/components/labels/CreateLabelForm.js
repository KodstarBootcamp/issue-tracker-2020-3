import React, { useState, useEffect } from 'react'
//import { Form, Button } from 'react-bootstrap'
import { Multiselect } from 'multiselect-react-dropdown'
import Axios from 'axios'
import { useHistory } from 'react-router-dom'
import ColorSelect from './ColorSelect'

const CreateLabelForm = () => {
  let history = useHistory()
  const [addLabelSelect, setAddLabelSelect] = useState([])
  const [labels, setLabels] = useState([])
  const [options, setOptions] = useState([
    { Label: 'Bug' },
    { Label: 'Enhancement' },
    { Label: 'Question' },
    { Label: 'Suggestion' },
    { Label: 'Critical' },
  ])

  useEffect(async () => {
    const response = await Axios.get('/issues/labels')
    const UppercaseLabels = response.data.map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1)
    )

    const optionsText = options.map((item) => item.Label)

    const allText = [...optionsText, ...UppercaseLabels]
    const uniques = [...new Set(allText)]

    const allOptions = uniques.map((item) => ({ Label: item }))
    setOptions(allOptions)
  }, [])


  /*const validate = (newIssue) => {
    if (newIssue.title.length < 1) {
      alert('Title cannot be left blank')
      return false
    } else if (newIssue.title.length > 250) {
      alert('Title cannot exceed 250 characters')
      return false
    } else if (newIssue.description.length > 1500) {
      alert('Description cannot exceed 1500 characters')
      return false
    }
    return true
  }*/
  const addLabelHandler = () => {
    const labelName = prompt('Please enter  label name', '')
    if (labelName === null) {
      return
    }
    if (labelName.length < 1) {
      alert('Title can not be left blank')
      return
    }

    const newLabelObject = {
      Label: labelName.charAt(0).toUpperCase() + labelName.slice(1),
    }
    setLabels([...labels, newLabelObject])
    setOptions([...options, newLabelObject])
    setAddLabelSelect([...addLabelSelect, newLabelObject])
  }

  const onSelect = (data) => {
    setAddLabelSelect(data)
    setLabels(data)
  }

  const onRemove = (data) => {
    setAddLabelSelect(data)
    setLabels(data)
  }

  return (
    <form className="w-75 ml-auto mr-auto mt-5">
      <div className="d-flex ">
        <div className="form-group  flex-grow-1 mt-3">
          <label htmlFor="exampleFormControlSelect1"> Label selection </label>
          <Multiselect
            options={options}
            selectedValues={addLabelSelect}
            displayValue="Label"
            emptyRecordMsg="No options available. Add new one"
            onSelect={onSelect}
            onRemove={onRemove}
          />
        </div>
        <div>
          <button
            onClick={addLabelHandler}
            type="button"
            className="btn btn-success mt-5 ml-3"
          >
            Add New Label
          </button>
        </div>
        <div>
          <button
            type="button"
            className="btn btn-success mt-5 ml-3"
            onClick= {(() => history.push('/labellist'))}
          >
            Label List
          </button>
          <ColorSelect />
        </div>
      </div>

    </form>
  )
}

export default CreateLabelForm