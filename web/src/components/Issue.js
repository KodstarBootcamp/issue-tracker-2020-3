import React,{ useState } from 'react'
import IssueEditForm from './IssueEditForm'
//import { Card } from 'react-bootstrap'
import { BsArrowDown, BsTrash,BsChevronCompactUp, BsPencil } from 'react-icons/bs'
const Issue = ( props ) => {
  const [viewIssue,setViewIssue]= useState(false)
  const [view,setView] = useState(false)

  const createDate = new Date(props.issue.createdDate)
  const updateDate = new Date( props.issue.updateDate)
  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start">
          {view?<IssueEditForm key={props.issue.id} labels={props.labels} issue={props.issue} addLabel={props.addLabel}
            setData={props.setData} setInfoMessage={props.setInfoMessage} setView={setView} setIssueSelect={props.setIssueSelect}
            issueSelect={props.issueSelect}
          />:
            !viewIssue?props.issue.title:''}
          {viewIssue?
            <div >
              <h5>Title:</h5>
              {props.issue.title}
              <h5>Description:</h5>
              {props.issue.description}
              <h5>Labels:</h5>
              {props.issue.labels.map(label => label.text)}
              <h5>Date:</h5>
              {props.issue.updateDate?
                <div>Updated: {updateDate.toDateString()} {updateDate.toTimeString()}</div>
                :''}
              Created: {createDate.toDateString()} {createDate.toTimeString()}
            </div>
            :''}
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
