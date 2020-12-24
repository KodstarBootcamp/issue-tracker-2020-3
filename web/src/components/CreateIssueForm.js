import React from 'react'
import {Form, Button } from 'react-bootstrap'


const CreateIssueForm = ({ createIssue }) => {

  const addIssue= (event) => {
    event.preventDefault()
    const title= event.target.title.value
    const description=event.target.description.value
    const labels= event.target.labels.value
    event.target.title.value = ''
    event.target.description.value = ''
    event.target.labels.value = ''
    createIssue ({ title, description, labels })
  }

  return (
    <div>
      <h2>Create a new issue</h2>
      <Form onSubmit={addIssue}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id="title"
            type="text"
            name="title"
          />
          <Form.Label>description:</Form.Label>
          <Form.Control
            id="description"
            type="text"
            name="description"
          />
          <Form.Label>labels:</Form.Label>
          <Form.Control
            id="labels"
            type="text"
            name="labels"
          />
          <Button id="createButton" type="submit" variant="primary">create new issue</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CreateIssueForm