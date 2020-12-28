import React,{ useState } from 'react'
import EditForm from './EditForm'
import { Card } from 'react-bootstrap'
import { BsArrowDown, BsTrash,BsChevronCompactUp, BsPencil } from 'react-icons/bs'
const Issue = ( props ) => {
  // eslint-disable-next-line no-unused-vars
  const [viewIssue,setViewIssue]= useState(false)
  const [view,setView] = useState(false)
  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start">
          {view?<EditForm key={props.issue.id} issue={props.issue} setData={props.setData} setInfoMessage={props.setInfoMessage} setView={setView} />:
            !viewIssue?props.issue.title:''}
          {viewIssue?<Card.Body>
            <h5>Title:</h5>
            <Card.Text>{props.issue.title}</Card.Text>
            <h5>Description:</h5>
            <Card.Text> {props.issue.description} </Card.Text>
            <h5>Labels:</h5>
            <Card.Text>{props.issue.labels}</Card.Text>
          </Card.Body>:''}
        </div>
      </td>
      <td ><BsPencil  onClick={() => setView(true)} style={{ color: 'blue' }} className="ml-4" size={16} /></td>
      <td><p style={{ color: 'red' }}>  <BsTrash onClick={ () => props.handleDelete(props.issue.id)} className="ml-1" /></p></td>
      <td>{!viewIssue? <BsArrowDown style={{ color: 'green' }} onClick={ () => setViewIssue(true)} />//more
        :
        <BsChevronCompactUp style={{ color: 'green' }} onClick={ () => setViewIssue(false)} size={24} />}</td>{//less
      }
    </tr>
  )
}
export default Issue