import React from 'react'
import { Form, Button,Col, CardColumns } from 'react-bootstrap'
import Edit from '../../services/labels'
import ColorSelect from './ColorSelect'

const LabelEditForm = ( props ) => {
  const [labelColor,setLabelColor] = React.useState([])//
  const handleSubmit = ( event ) => {
    event.preventDefault()
    event.persist()
    const id= props.label.id
    const title= event.target.title.value
    event.target.title.value = ''
    Edit.update( {
      id: id,
      text: title,
      color:labelColor,
    }).then(returnedObj => {
      props.setDataLabel( old => {
        old = old.filter (obj =>  obj.id !==id )
        props.setInfoMessage(`${returnedObj.text} updated`)
        setTimeout( () => {
          props.setInfoMessage(null)
        }, 5000)
        return old.concat(returnedObj)
      })
    })
    props.setView(false)
  }
  console.log('Label Color',labelColor)

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
              defaultValue={props.label.text}
              name="title"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02" className="ml-3">
            <Form.Label >color</Form.Label><br></br>{labelColor}
            <div>
              <ColorSelect setLabelColor={setLabelColor}/>
            </div>
          </Form.Group>
          <Form.Group as={CardColumns}>
            <Col className="ml-3">
              <Button type="submit">update</Button>
              <Button  variant="danger" onClick={() => props.setView(false)} >cancel</Button>
            </Col>
          </Form.Group>
        </Form.Row>
      </Form>
    </div>
  )
}
export default LabelEditForm
