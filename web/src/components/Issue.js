import React,{ useState } from 'react'
import EditForm from './EditForm'
import { Card } from 'react-bootstrap'
import { BsArrowDown, BsTrash,BsChevronCompactUp, BsPencil } from 'react-icons/bs'
const Issue = ( props ) => {
  const [viewIssue,setViewIssue]= useState(false)
  const [view,setView] = useState(false)
  function getParsedDate(date){
    date = String(date).split('T')
    const days = String(date[0]).split('-')
    const hours = String(date[1]).split(':')
    return [parseInt(days[0]), parseInt(days[1])-1, parseInt(days[2]), parseInt(hours[0]), parseInt(hours[1]), parseInt(hours[2])]
  }
  const createDate = new Date(...getParsedDate(props.issue.createdDate))
  const updateDate = new Date(...getParsedDate(props.issue.updateDate))
  console.log(createDate.toDateString(),createDate.toTimeString())
  console.log(updateDate.toDateString())
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
            <Card.Text >{props.issue.labels.map(label => label.text)}</Card.Text>
            <h5>Date:</h5>
            {props.issue.updateDate?<Card.Text>Updated: {updateDate.toDateString(),updateDate.toTimeString()}</Card.Text> :''}
            <Card.Text>Created: {createDate.toDateString(),createDate.toTimeString()}</Card.Text>
          </Card.Body>:''}
        </div>
      </td>
      <td ><BsPencil  onClick={() => setView(true)} style={{ color: 'blue' }} className="ml-4" size={16} /></td>
      <td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.issue.id)} className="ml-1" /></td>
      <td>{!viewIssue? <BsArrowDown style={{ color: 'green', }} size={28} onClick={ () => setViewIssue(true)} />
        :
        <BsChevronCompactUp style={{ color: 'green' }} size={32} onClick={ () => setViewIssue(false)}  />}</td>{//less
      }
    </tr>
  )
}
export default Issue
