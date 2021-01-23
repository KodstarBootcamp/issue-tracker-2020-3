

import React from 'react'
import { Form,Col,Button,CardColumns } from 'react-bootstrap'//
import stateService from '../../services/ApiState'

export const StateEditForm = ( props ) => {
  const handleSubmit = ( event ) => {
    event.preventDefault()
    event.persist()
    const id= props.state.id
    const name= event.target.name.value
    const order_no= Number(event.target.order_no.value)
    event.target.name.value = ''
    stateService.update( {
      id: id,
      name: name,
      order_no:order_no,
    }).then(returnedObj => {
      props.setStateList( old => {
        old = old.filter (obj =>  obj.id !==id )
        props.setInfoMessage(`${returnedObj.name} updated`)
        setTimeout( () => {
          props.setInfoMessage(null)
        }, 5000)
        return old.concat(returnedObj)
      })
    })
    props.setViewStateEdit(false)//controlId="validationCustom05"  controlId="validationCustom06"
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4"   className="ml-3">
          <Form.Label>name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="name"
            defaultValue={props.state.name}
            name="name"
          />
        </Form.Group>
        <Form.Group as={Col} md="4"  className="ml-3">
          <Form.Label>order no:</Form.Label>
          <Form.Control
            required
            id="order_no"
            type="number"
            name="order_no"
            defaultValue={props.state.order_no}
          />
        </Form.Group>
        <Form.Group as={CardColumns}>
          <Col className="ml-3">
            <Button type="submit">update</Button>{'    '}
            <Button  variant="danger" onClick={() => props.setViewStateEdit(false)} >cancel</Button>
          </Col>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}