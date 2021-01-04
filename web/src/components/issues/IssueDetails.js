import React,{ useState } from 'react'
import { IssueEditForm } from './IssueEditForm'
import { Card, Container,Row,Col } from 'react-bootstrap'
import { BsArrowDown, BsTrash,BsChevronCompactUp, BsPencil } from 'react-icons/bs'

export const IssueDetails = ( props ) => {
  const [viewIssue,setViewIssue]= useState(false)
  const createDate = new Date(props.issue.createdDate)
  const updateDate = new Date( props.issue.updateDate)

  return (
    <tr>
      <td>
        {props.viewIssueEdit?<IssueEditForm option={props.option} setOptions={props.setOptions} key={props.issue.id} setViewIssueEdit={props.setViewIssueEdit} labels={props.labels} issue={props.issue} addLabel={props.addLabel}
          setIssues={props.setIssues} setInfoMessage={props.setInfoMessage} setIssueSelect={props.setIssueSelect}
          issueSelect={props.issueSelect}/>:!viewIssue?props.issue.title
          :null}
        {viewIssue?<Card.Body>
          <h5>Title:</h5>
          <Card.Text>{props.issue.title}</Card.Text>
          <h5>Description:</h5>
          <Card.Text>{props.issue.description}</Card.Text>
          <h5>Labels:</h5>
          <Container className="d-flex-colums justify-content-start">
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
      <td><BsPencil onClick={() => props.setViewIssueEdit(true)} style={{ color: 'blue' }} className="ml-4" size={16}/></td>
      <td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.issue.id)} className="ml-1"/></td>
      <td>{!viewIssue?<BsArrowDown style={{ color: 'green', }} size={28} onClick={ () => setViewIssue(true)}/>
        :<BsChevronCompactUp style={{ color: 'green' }} size={32} onClick={ () => setViewIssue(false)}/>}</td>
    </tr>
  )
}

/*



 <tr><h5>Date</h5>
            {props.issue.updateDate?
              <tr>
                <td>Updated:</td>
                <tr>{updateDate.toDateString()}</tr>
                <tr>{updateDate.toTimeString()}</tr>
              </tr>:null}
            <tr>
              <td>Created:</td>
              <tr>{createDate.toDateString()}</tr>
              <tr>{createDate.toTimeString()}</tr>

            </tr>
          </tr>




{viewIssue?<>
          <h5>Title</h5>
          {props.issue.title}
          <tr><h5>Description</h5></tr>
          {props.issue.description}
          <h5>Labels</h5>
          <tr className="d-flex justify-content-start">
            {props.issue.labels.map(label =>
              (<td key={label.id} style={{ backgroundColor: label.color } }>{label.text}</td>))}</tr>
          <h5>Date</h5>
          <tr>{props.issue.updateDate?
            <tr><td>Updated:</td>
              <td>
                {updateDate.toDateString()}
                {updateDate.toTimeString()}
              </td>
            </tr>:null}
          <tr><td>Created:</td><td><tr>{createDate.toDateString()}</tr><tr>{createDate.toTimeString()}</tr></td></tr></tr>
        </>
          :null}
*/