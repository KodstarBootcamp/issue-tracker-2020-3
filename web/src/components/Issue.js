import React,{ useState } from 'react'
import IssueEditForm from './IssueEditForm'
//import { Table } from 'react-bootstrap'
import { BsArrowDown, BsTrash,BsChevronCompactUp, BsPencil } from 'react-icons/bs'
const Issue = ( props ) => {
  const [viewIssue,setViewIssue]= useState(false)

  const [view,setView] = useState(false)
  const createDate = new Date(props.issue.createdDate)
  const updateDate = new Date( props.issue.updateDate)

  return (
    <tr>
      {view?
        <td><IssueEditForm key={props.issue.id} labels={props.labels} issue={props.issue} addLabel={props.addLabel}
          setData={props.setData} setInfoMessage={props.setInfoMessage} setView={setView} setIssueSelect={props.setIssueSelect}
          issueSelect={props.issueSelect}
        /> </td>:
        !viewIssue?props.issue.title
          :''}
      {viewIssue?<td>
        <tr><h5>Title</h5></tr>
        <tr>{props.issue.title}</tr>
        <tr><h5>Description</h5></tr>
        <tr>{props.issue.description}</tr>
        <tr><h5>Labels</h5></tr>
        <tr className="d-flex justify-content-start">
          {props.issue.labels.map(label =>
            (
              <td key={label.id} style={{ backgroundColor: label.color } }>{label.text}</td>
            )
          )}
        </tr>
        <tr><h5>Date</h5></tr>
        <tr>
          {props.issue.updateDate?
            <tr><td>Updated:</td> <td><tr>{updateDate.toDateString()} </tr><tr>{updateDate.toTimeString()}</tr></td>
            </tr>
            :''}
          <tr><td>Created:</td><td><tr> {createDate.toDateString()} </tr><tr>{createDate.toTimeString()}</tr></td></tr>
        </tr>
      </td> :''}
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