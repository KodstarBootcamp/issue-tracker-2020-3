import React, { useState,useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import CreateLabelForm from './labels/CreateLabelForm.js'

const CreateIssueForm = ( props ) => {
  const [title,setTitle]=useState([])
  const [description,setDescription]=useState([])
  const [colorlabel,setcolorLabel]=useState([])//color, text
  const [option,setOptions] =useState([])
  const history = useHistory()

  useEffect( async() => {
    const labels= props.labels
    const uniques = [...new Set(labels)]
    const allOptions = uniques.map((item) => ({ label: item.text,value:item.color }))
    setOptions(allOptions)
  },
  [])

  const addIssue= ( event ) => {
    event.preventDefault()
    props.createIssue ({ title: title, description: description, labels:colorlabel })
    setTitle('')
    setDescription('')
  }

  function onChangeInput(value){
    if(value){
      setcolorLabel(value.map(ıtem => ({ text:ıtem.label,color:ıtem.value })) )
    }
  }

  const styles={

    select:{
      width:'100%',
      maxWidth:600
    }
  }

  return (
    <div className="formDiv">
      <h2>Create a new issue</h2>
      <Form onSubmit={addIssue}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            required
            id="title"
            type="text"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>description:</Form.Label>
          <Form.Control
            required
            id="description"
            type="text"
            name="description"
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />
          <Form.Label>Labels:</Form.Label>
          <div>
            {option?<CreateLabelForm style={styles.select} option={option} isMulti={true}  onChange={onChangeInput}/>:''}
          </div>
          <Button id="createButton" type="submit" variant="primary">create new issue</Button>
          <Button  variant="secondary" onClick={() => history.push('/labellist')} >labellist</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateIssueForm
