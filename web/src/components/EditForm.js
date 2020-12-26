import React from 'react'
import {Form, Button,Col, CardColumns } from 'react-bootstrap'

import Edit from '../services/issues'

const EditForm = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log("Update area") 
    const id= props.issue.id;
    const title= event.target.title.value
    const description=event.target.description.value
    const labels= event.target.labels.value
    event.target.title.value = ''
    event.target.description.value = ''
    event.target.labels.value = ''
   
    Edit.update( {
      id: id,
      title: title,
      description: description,
      labels:labels,
    }).then(returnedObj => {
      props.setData( old => {
         old = old.filter (obj =>  obj.id !==id)
         props.setInfoMessage(`${returnedObj.title} updated`)
      setTimeout(() => {
        props.setInfoMessage(null)
      }, 5000)
      return old.concat(returnedObj)
      })
     
    })
    console.log(title,description,labels)
    props.setView(false)
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01"  className="ml-3">
          <Form.Label>title</Form.Label>
          <Form.Control 
            required
            type="text"
            placeholder="title"
            defaultValue={props.issue.title}
            name="title"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02" className="ml-3">
          <Form.Label>description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="description"
           defaultValue={props.issue.description}
           name="description"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom03" className="ml-3"> 
          <Form.Label>labels</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="labels"
            name="labels"
           defaultValue={props.issue.labels}
          />
        </Form.Group>
      </Form.Row> 
      <Form.Group as={CardColumns}>
            <Col className="ml-3">
              <Button type="submit">update</Button>
              <Button  variant="danger" onClick={() => props.setView(false)} >cancel</Button>
            </Col>
      </Form.Group>
    </Form>
    </div>
  )
}

export default EditForm