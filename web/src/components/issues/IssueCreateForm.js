import React, { useState } from 'react'
import { Form, Button,  Modal } from 'react-bootstrap'//ButtonToolbarButtonGroup
import { LabelSelect } from '../labels'
import { LabelCreateForm } from '../labels'
import '../../App.css'
import AssignModel from '../modals/AssignModel'

export const IssueCreateForm = ( props ) => {
  const [title,setTitle]=useState([])
  const [description,setDescription]=useState([])
  const [colorlabel,setColorLabel]=useState([])
  const [smShow, setSmShow] = useState(false)
  const [smAssignShow, setAssignSmShow] = useState(false)
  const [assignUser,setAssignUser] = useState([])
  const [assignedUsername,setAssignedUsername] = useState([])

  const addIssue= ( event ) => {
    event.preventDefault()
    props.createIssue ({ title: title, description: description, labels:colorlabel,assignees:assignUser })
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
  //Assign issue to user =====
  const handleClickAssign =( event ) => {
    event.preventDefault()
    setAssignSmShow(true)
  }
  const onChangeAssign=(value) => {
    if(value){
      setAssignUser(value.map(ıtem => ıtem.value ) )
      setAssignedUsername(value.map(ıtem => ıtem.label ) )
    }
  }
  const handleClickAssignMySelf=() => {//Assign issue my self
    if(!assignUser.includes(props.user.user.id)&&!assignedUsername.includes(props.user.user.username)){

      setAssignUser(assignUser.concat(props.user.user.id))
      setAssignedUsername(assignedUsername.concat(props.user.user.username))
    }
  }
  //=========
  return (
    <div className="form">
      <h2>Create a new issue</h2>
      <div className='d-flex border border-dark'>
        <div className='col--3 mr-auto flex-fill col col--3'>
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
        <div className='mr-auto flex-fill col col--3 border border-primary'>
          <div className='flex-fill border-bottom border-primary'>
            <h5>Assign</h5>
            <AssignModel style={styles.select} isMulti={true} onChangeAssign={onChangeAssign} setAssignSmShow={setAssignSmShow} userOption={props.userOption}
              setUserOption={props.setUserOption} smAssignShow={smAssignShow}/>
            <Button variant="#aab0bd"  onClick={handleClickAssignMySelf}>assign myself:</Button><br/>
            <Button variant="#aab0bd"  onClick={handleClickAssign}>Users:</Button>
            {assignedUsername?
              <>
                {assignedUsername.map(username => username+' ' )}
              </>:''}
          </div>
          <div className=''>
            <h5>Labels:</h5>
            {props.option?<LabelSelect style={styles.select} option={props.option} isMulti={true}  onChange={onChangeInput}/>:''}
            <Button variant="#aab0bd"  onClick={handleClick}>create label</Button>
          </div>
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


