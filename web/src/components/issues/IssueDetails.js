import React,{ useState } from 'react'
import { IssueEditForm } from './IssueEditForm'
import { Card, Container,Row,Col } from 'react-bootstrap'
import { BsArrowDown, BsTrash,BsChevronCompactUp, BsPencil } from 'react-icons/bs'

export const IssueDetails = ( props ) => {
  const [viewIssue,setViewIssue]= useState(false)
  const [viewIssueEdit,setViewIssueEdit] = useState(false)
  const createDate = new Date(props.issue.createdDate)
  const updateDate = new Date( props.issue.updateDate)

  return (
    <tr>
      <td>
        {viewIssueEdit?<IssueEditForm option={props.option} setOptions={props.setOptions} key={props.issue.id} setViewIssueEdit={setViewIssueEdit} labels={props.labels} issue={props.issue} addLabel={props.addLabel}
          setIssues={props.setIssues} setInfoMessage={props.setInfoMessage} setIssueSelect={props.setIssueSelect}
          issueSelect={props.issueSelect}/>:!viewIssue?props.issue.title
          :null}
        {viewIssue?<Card.Body className='IssueDetails'>
          <h5>Title:</h5>
          <Card.Text className='title'>{props.issue.title}</Card.Text>
          <h5>Description:</h5>
          <Card.Text className='description'>{props.issue.description}</Card.Text>
          <h5>Labels:</h5>
          <Container className="d-flex-colums justify-content-start" >
            <Row>
              {props.issue.labels.map(label => (<Col md={'first'} style={{ backgroundColor: label.color,hr:10 } } key={label.id}>{label.text}</Col>))}
            </Row>
          </Container>
          <h5>Date:</h5>
          <Container className="d-flex-colums justify-content-start" >
            <Row style={{ backgroundColor: 'greenyellow' } }>
              {props.issue.updateDate&&(updateDate.toTimeString()!==createDate.toTimeString())?<Col>
                <Row>Updated:</Row>
                <Row>{updateDate.toDateString()}</Row>
                <Row>{updateDate.toTimeString()}</Row>
              </Col>:''}
            </Row>
            <Row style={{ backgroundColor: '#ff8700' } }>
              <Col><Row>Created:</Row>
                <Row>{createDate.toDateString()}</Row>
                <Row>{createDate.toTimeString()}</Row>
              </Col>
            </Row>
          </Container>
        </Card.Body>:null}
      </td>
      <td><BsPencil onClick={() => setViewIssueEdit(true)} style={{ color: 'blue' }} className="ml-4" size={16}/></td>
      <td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.issue.id)} className="ml-1"/></td>
      <td>{!viewIssue?<BsArrowDown data-testid='view' style={{ color: 'green', }} size={28} onClick={ () => setViewIssue(true)}/>
        :<BsChevronCompactUp style={{ color: 'green' }} size={32} onClick={ () => setViewIssue(false)}/>}</td>
    </tr>
  )
}
