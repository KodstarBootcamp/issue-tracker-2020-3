import React  from 'react'//useState
import issueService from '../../services/ApiIssues'
import { IssueDetails } from './IssueDetails'
import PaginationIssue from '../../components/PaginationIssue'
import { Table } from 'react-bootstrap'

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


  return (
    <div>
      <div>
        <h1>Issue Details, Total:{props.issues !==null?props.issues.length:null}</h1>
        <div className="d-flex-colums justify-content-reserve">
          <PaginationIssue issueLength={props.issueLength} setStart={props.setStart}  setCount={props.setCount}  setIssues={props.setIssues} setCheckError={props.setCheckError}/>
        </div>

        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {props.issues!==null ?
              props.issues.map((issue) =>
                <IssueDetails option={props.option} setOptions={props.setOptions} viewIssueEdit={props.viewIssueEdit} setViewIssueEdit={props.setViewIssueEdit} issueSelect={props.issueSelect} setIssueSelect={props.setIssueSelect} key={issue.id} issue={issue} addLabel={props.addLabel}
                  labels={props.labels} setInfoMessage={props.setInfoMessage} setIssues={props.setIssues} handleDelete={handleDelete}
                />
              )
              :null}
          </tbody>
        </Table>
      </div>
      {/*<div className="d-flex flex-row align-items-center">
        <h2 className={headerClass}>
          <strong className="text-secondary">{totalIssues}</strong> Issues
        </h2>
        { currentPage && (
          <span className="current-page d-inline-block h-100 pl-4 text-secondary">
                  Page <span className="font-weight-bold">{ currentPage }</span> / <span className="font-weight-bold">{ totalPages }</span>
          </span>
        ) }
      </div>
      <div className="d-flex flex-row py-4 align-items-center">
        <Pagination totalRecords={totalIssues} pageLimit={18} pageNeighbours={1} onPageChanged={onPageChanged} />
      </div>
      <div className="d-flex flex-row py-4 align-items-center">
        {currentIssues.map( issue => {issue}) }
        </div>*/}
    </div>
  )
}