import React,{ useState } from 'react'
import { Form, ButtonToolbar,ButtonGroup, Button,Col, CardColumns,Modal } from 'react-bootstrap'
import Edit from '../../services/ApiIssues'
import { LabelSelect, LabelCreateForm } from '../labels'
import AssignModel from '../modals/AssignModel'
import { BsPerson } from 'react-icons/bs'


export const IssueEditForm = ( props ) => {
  const [smShow, setSmShow] = useState(false)
  const [colorlabel,setColorLabel]=useState([])
  const [assignUser,setAssignUser] = useState([])
  const [assignedUsername,setAssignedUsername] = useState([])
  const [smAssignShow, setAssignSmShow] = useState(false)

  const handleSubmit = ( event ) => {
    event.preventDefault()
    const id= props.issue.id
    if(!props.issueSelect){
      const title= event.target.title.value
      const description=event.target.description.value
      const sendingLabel = (colorlabel.length===0)?props.issue.labels.map(label => ({ text:label.text,color:label.color })):colorlabel
      const sendingAssignees = (assignUser.length===0)?props.issue.assignees.map(item => item ):assignUser
      event.target.title.value = ''
      event.target.description.value = ''
      props.setViewIssueEdit(false)
      Edit.update( {
        id: id,
        title: title,
        description: description,
        labels:sendingLabel,
        assignees:sendingAssignees
      }).then(returnedObj => {
        props.setIssues( old => {
          old = old.filter (obj =>  obj.id !==id )
          props.setInfoMessage(`${returnedObj.title} updated`)
          setTimeout( () => {
            props.setInfoMessage(null)
          }, 5000)
          return old.concat(returnedObj)
        })
      })
    }
  }

  const onChangeInput=(value) => {
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
    props.setIssueSelect(true)
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

  return (
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
            as="textarea"
            required
            type="text"
            placeholder="description"
            defaultValue={props.issue.description}
            name="description"
          />
        </Form.Group>
        <div className='d-flex p-3 border border-dark'>
          <div className='d-flex p-3 border border-right-dark'>
            <h5>Assigned: </h5>
            {props.issue.assignees.map(assign => assign.username + '   ')}
          </div>
          <div className='d-flex p-3 border border-right-dark'>
            <div>
              <AssignModel issue={props.issue} style={styles.select} isMulti={true} onChangeAssign={onChangeAssign} setAssignSmShow={setAssignSmShow} userOption={props.userOption}
                setUserOption={props.setUserOption} smAssignShow={smAssignShow}/>
              <Button variant="#aab0bd"  onClick={handleClickAssignMySelf}>assign myself</Button>
            </div>
            <div>
              <BsPerson onClick={handleClickAssign} style={{ color: 'blue' }} className="ml-4" size={16}/><br/>
              {assignedUsername?
                <>
                  {assignedUsername.map(username => username+' ' )}
                </>:''}
            </div>
          </div>
        </div>
        <Form.Group as={Col} md="8" controlId="validationCustom03" className="ml-3">
          <Form.Label>Labels:</Form.Label>
          <LabelSelect issue={props.issue} style={styles.select} option={props.option} isMulti={true}  onChange={onChangeInput}/>
          <Button  variant="success"  onClick={handleClick}>create label</Button>
        </Form.Group>
      </Form.Row>
      <Form.Group as={CardColumns}>
        <Col className="ml-3">
          <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="mr-1" aria-label="First group">
              <Button type="submit">update</Button>
            </ButtonGroup>
            <ButtonGroup className="mr-1" aria-label="Second group">
              <Button  variant="danger" onClick={() => props.setViewIssueEdit(false)} >cancel</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </Col>
      </Form.Group>
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
          <LabelCreateForm setViewIssueEdit={ props.setViewIssueEdit } issueSelect={props.issueSelect} setIssueSelect={props.setIssueSelect} setLabelSelect={props.setLabelSelect}
            addLabel={props.addLabel} setSmShow={setSmShow}
          />
        </Modal.Body>
      </Modal>
    </Form>
  )
}
