import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import CreateLabelForm from './labels/CreateLabelForm'

const CreateIssueForm = ( props ) => {
  const [title,setTitle]=useState([])
  const [description,setDescription]=useState([])
  const [labels]=useState([])//color, text

  const addIssue= ( event ) => {
    event.preventDefault()
    props.createIssue ({ title: title, description: description, labels:[ { text:labels } ] })
    setTitle('')
    setDescription('')
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
          <div>
            <CreateLabelForm />
          </div>
          <Button id="createButton" type="submit" variant="primary">create new issue</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateIssueForm
