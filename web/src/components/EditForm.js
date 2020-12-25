import React,{useState} from 'react'
import {Form, Button,Col,Row, CardColumns } from 'react-bootstrap'

import Edit from '../services/issues'


const EditForm = ({issue, setView,setData, setInfoMessage }) => {

  const handleSubmit = (event) => {
    event.preventDefault()
     console.log("Update area") 
    const id= issue.id;
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
      setData( old => {
         old = old.filter (obj =>  obj.id !==id)
          setInfoMessage(`${returnedObj.title} updated`)
      setTimeout(() => {
        setInfoMessage(null)
      }, 5000)
      return old.concat(returnedObj)
      })
     
    })
    console.log(title,description,labels)
    //setValidated(true);
    setView(false)
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
            defaultValue={issue.title}
            name="title"
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02" className="ml-3">
          <Form.Label>description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="description"
           defaultValue={issue.description}
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
           defaultValue={issue.labels}
          />
        </Form.Group>
       
      </Form.Row> 
      <Form.Group as={CardColumns}>
            <Col sclassName="ml-3">
              <Button type="submit">update</Button>
            </Col>
      </Form.Group>
    </Form>
    </div>
  )
}

export default EditForm