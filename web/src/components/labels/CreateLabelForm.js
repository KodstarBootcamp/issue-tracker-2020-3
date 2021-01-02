import React from 'react'
import { Form, Button,Col, CardColumns } from 'react-bootstrap'
import ColorSelect from './ColorSelect'

const CreateLabelForm = ( props ) => {
  const [labelColor,setLabelColor] = React.useState([])//

  const addLabel= ( event ) => {
    event.preventDefault()
    event.persist()
    props.addLabel ({ text: event.target.title.value, color:labelColor })
    event.target.title.value = ''
    props.setSmShow(false)
    if( props.labelSelect){
      props.setLabelSelect(true)
    } else if(props.issueSelect) {
      props.setIssueSelect(true)
    }

    props.setView(false)
  }

  return (
    <div>
      <Form onSubmit={addLabel}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01"  className="ml-5">
            <Form.Label>title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="title"
              name="title"
            />
          </Form.Group>
          <Form.Group as={Col} md="5" controlId="validationCustom02" className="ml-5">
            <Form.Label >color</Form.Label><br></br>{labelColor}
            <div>
              <ColorSelect setLabelColor={setLabelColor}/>
            </div>
          </Form.Group>
          <Form.Group as={CardColumns}>
            <Col className="ml-1">
              <Button type="submit">create label</Button>
              <Button  variant="danger" onClick={() => props.setSmShow(false)} >cancel</Button>
            </Col>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  )
}
export default CreateLabelForm
