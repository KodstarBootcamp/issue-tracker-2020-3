import React, { useState } from 'react'
import { Form, Button,Col, CardColumns } from 'react-bootstrap'
import ColorSelect from './ColorSelect'

export const LabelCreateForm = ( props ) => {

  const [title,setTitle]=useState([])
  const [labelColor,setLabelColor] = useState([])

  const addLabel= ( event ) => {
    event.preventDefault()
    event.persist()
    props.addLabel ({ text: title, color:labelColor })
    setTitle('')
    if( props.labelSelect){//It is for label create in Labellist page
      props.setLabelSelect(true)
    } else if(props.issueSelect) {//It is for issue create in create issue form page
      props.setIssueSelect(true)
      props.setViewIssueEdit(false)
    }
    props.setSmShow(false)

  }

  return (
    <Form onSubmit={addLabel}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01"  className="ml-5">
          <Form.Label>title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="title"
            name="title"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group as={Col} md="5" controlId="validationCustom02" className="ml-5">
          <Form.Label >color</Form.Label><br></br>{labelColor}
          <ColorSelect setLabelColor={setLabelColor}/>
        </Form.Group>
        <Form.Group as={CardColumns}>
          <Col className="ml-1">
            <Button type="submit">create label</Button>
            <Button  variant="danger" onClick={() => props.setSmShow(false)} >cancel</Button>
          </Col>
        </Form.Group>
      </Form.Row>
    </Form>
  )
}
