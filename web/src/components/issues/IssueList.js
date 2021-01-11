import React  from 'react'
import issueService from '../../services/ApiIssues'
import { IssueDetails } from './IssueDetails'
import PaginationIssue from '../../components/PaginationIssue'
import { Table } from 'react-bootstrap'
import LoadingSpinner from './LoadingSpinner'

export const IssueList = ( props ) => {
  const handleDelete=( id ) => {
    const issueDelete = props.issues.find(b => b.id === id)
    if (window.confirm(`Do you want to delete '${issueDelete.title}'?`)) {
      issueService.deleteOneIssue(id).then(() => {
        props.setIssues(props.issues.filter(p => p.id !== id))
        props.setInfoMessage(`'${issueDelete.title}' deleted`)
      })
        .catch(error => {
          props.setCheckError(`Error: ${error.message}`)
        })
    }
    setTimeout(() => {
      props.setInfoMessage(null)
      props.setCheckError(null)
    }, 5000)
  }

  return props.issues.length?(
    <div>
      <div className='IssueList'>
        <h1>Issue Details, Total:{props.issues !==null?props.issues.length:null}</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              {props.user&&<th>Edit</th>}
              {props.user&&<th>Delete</th>}
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {props.issues.length?
              props.issues.map((issue) =>
                <IssueDetails key={issue.id} user={props.user} option={props.option} setOptions={props.setOptions} issueSelect={props.issueSelect} setIssueSelect={props.setIssueSelect}
                  issue={issue} addLabel={props.addLabel}
                  labels={props.labels} setInfoMessage={props.setInfoMessage} setIssues={props.setIssues} handleDelete={handleDelete}
                />
              )
              :null}
          </tbody>
        </Table>
      </div>
      <div className="d-flex flex-row-reverse bd-highlight">
        <PaginationIssue totalPage={props.totalPage} issueLength={props.issueLength} setStart={props.setStart}
          setCount={props.setCount}  setIssues={props.setIssues} setCheckError={props.setCheckError}/>
      </div>
    </div>
  ):(<LoadingSpinner/>)
}