import React, { useState } from 'react'
import { Form, Button,  Modal } from 'react-bootstrap'//ButtonToolbarButtonGroup
import { LabelSelect } from '../labels'
import { LabelCreateForm } from '../labels'

export const IssueCreateForm = ( props ) => {
  const [title,setTitle]=useState([])
  const [description,setDescription]=useState([])
  const [colorlabel,setColorLabel]=useState([])
  const [smShow, setSmShow] = useState(false)

  const addIssue= ( event ) => {
    event.preventDefault()
    props.createIssue ({ title: title, description: description, labels:colorlabel })
    setTitle('')
    setDescription('')
  }

  function onChangeInput(value){
    if(value){
      setColorLabel(value.map(ıtem => ({ text:ıtem.label,color:ıtem.value })) )
    }
  }

  const styles={
    select:{
      width:'100%',
      maxWidth:600
    }
  }

  const handleClick= ( event ) => {
    event.preventDefault()
    props.setLabelSelect(true)
    setSmShow(true)
  }

  return (
    <div className="form">
      <h2>Create a new issue</h2>
      <div className='d-flex'>

        <div className='p-2 mr-auto flex-fill'>
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
                as="textarea"
                required
                id="description"
                type="text"
                name="description"
                value={description}
                onChange={({ target }) => setDescription(target.value)}
              />
              < Button id="createButton" type="submit" variant="primary">create new issue</Button>
            </Form.Group>
          </Form>
        </div >
        <div className='p-2 mr-auto flex-fill'>
          <br /><Button variant="primary"  onClick={handleClick}>assign</Button><br />
          <Form.Label>Labels:</Form.Label>
          {props.option?<LabelSelect style={styles.select} option={props.option} isMulti={true}  onChange={onChangeInput}/>:''}<br />
          <Button variant="success"  onClick={handleClick}>create label</Button>
        </div>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
            Create New Label
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <LabelCreateForm setViewIssueEdit={props.setViewIssueEdit} setLabelSelect={props.setLabelSelect} labelSelect={props.labelSelect} addLabel={props.addLabel}
              setSmShow={setSmShow}/>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}


