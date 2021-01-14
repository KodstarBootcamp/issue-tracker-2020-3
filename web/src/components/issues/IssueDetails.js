import React,{ useState } from 'react'
import { IssueEditForm } from './IssueEditForm'
import { Card, Container,Row,Col } from 'react-bootstrap'
import { BsFillCaretDownFill, BsTrash,BsFillCaretUpFill, BsPencil } from 'react-icons/bs'
import dateFormat from 'dateformat'

export const IssueDetails = ( props ) => {
  const [viewIssue,setViewIssue]= useState(false)
  const [viewIssueEdit,setViewIssueEdit] = useState(false)
  const createDate = new Date(props.issue.createdDate)
  const createDateFormat = dateFormat(createDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  const updateDate = new Date( props.issue.updateDate)
  const updateDateFormat = dateFormat(updateDate, 'dddd, mmmm dS, yyyy, h:MM:ss TT')
  return (
    <tr>
      <td>
        {viewIssueEdit&&<IssueEditForm  user={props.user} userOption={props.userOption} setUserOption={props.setUserOption}
          option={props.option} setOptions={props.setOptions} key={props.issue.id} viewIssueEdit={viewIssueEdit} setViewIssueEdit={setViewIssueEdit}
          labels={props.labels} issue={props.issue} addLabel={props.addLabel} setIssues={props.setIssues} setInfoMessage={props.setInfoMessage}
          setIssueSelect={props.setIssueSelect} issueSelect={props.issueSelect}/>}
        {!viewIssue&&!viewIssueEdit&&props.issue.title}
        {viewIssue&&<Card.Body className='IssueDetails'>
          <h5>Title:</h5>
          <Card.Text className='title'>{props.issue.title}</Card.Text>
          <h5>Description:</h5>
          <Card.Text className='description'>{props.issue.description}</Card.Text>
          <h5>Assigned:</h5>
          <Card.Text className='description'>{props.issue.assignees.map(assign => assign.username+'  ')}</Card.Text>
          <h5>Labels:</h5>
          <Container className="d-flex-colums justify-content-start" >
            <Row >
              {props.issue.labels.map((label,index) => (<Col md={'first'} style={{ color:'white', backgroundColor: label.color,hr:10 } } key={index}>{'-['}{label.text}{']-'}</Col>))}
            </Row>
          </Container>
          <h5>Date:</h5>
          <Container className="d-flex-colums justify-content-start">
            <Row style={{ backgroundColor: 'greenyellow' } }>
              {props.issue.updateDate&&(updateDate.toTimeString()!==createDate.toTimeString())&&<Col>
                <Row>Updated:</Row>
                <Row>{updateDateFormat}</Row>
              </Col>}
            </Row>
            <Row style={{ backgroundColor: '#ff8700' } }>
              <Col><Row>Created:</Row>
                <Row>{createDateFormat}</Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>}
      </td>
      {props.user&&<td><BsPencil onClick={() => setViewIssueEdit(true)} style={{ color: 'blue' }} className="ml-4" size={16}/></td>}
      {props.user&&<td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.issue.id)} className="ml-1"/></td>}
      <td>{!viewIssue?<BsFillCaretDownFill data-testid='view' style={{ color: 'green', }} size={28} onClick={ () => setViewIssue(true)}/>
        :<BsFillCaretUpFill style={{ color: 'green' }} size={32} onClick={ () => setViewIssue(false)}/>}</td>
    </tr>
  )
}
