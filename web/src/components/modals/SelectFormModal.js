import React,{ useState } from 'react'//useState useEffect
import { Modal,Form,Button } from 'react-bootstrap'

export const SelectFormModal =(props) => {
  const [name,setName] = useState()
  const [order_no,setOrder_no] = useState()

  const addState=() => {
    props.addState({ name,order_no })
    props.setStateSmShow(false)
  }
  return (
    <Modal
      size="sm"
      show={props.smStateShow}
      onHide={() => props.setStateSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
          {props.text}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={addState}>
          <Form.Group>
            <Form.Label>name:</Form.Label>
            <Form.Control
              required
              id="name"
              type="text"
              name="name"
              onChange={({ target }) => setName(target.value)}
            />
            <Form.Label>order no:</Form.Label>
            <Form.Control
              required
              id="order_no"
              type="number"
              name="order_no"
              onChange={({ target }) => setOrder_no(target.value)}
            />
            < Button id="createButton" type="submit" variant="primary">create new state</Button>
          </Form.Group>
        </Form>

      </Modal.Body>
    </Modal>
  )

}