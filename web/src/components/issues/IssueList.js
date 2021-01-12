import React from 'react'
import issueService from '../../services/ApiIssues'
import { IssueDetails } from './IssueDetails'
import PaginationIssue from '../../components/PaginationIssue'
import { Table } from 'react-bootstrap'//Form,Col,Button
import LoadingSpinner from './LoadingSpinner'
import Select from 'react-select'


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
  const options = [
    { value: 'title', label: 'title' },
    { value: 'createdAt', label: 'createdAt' },
    { value: 'updatedAt', label: 'updatedAt' }
  ]
  const onChange = (value) => {
    props.setSort(value.value)
  }
  const styles={
    menu: (provided, state) => ({
      ...provided,
      width: state.selectProps.width,
      borderBottom: '1px dotted pink',
      color: state.selectProps.menuColor,
      padding: 10,
      backgroundColor:'rgba(100,100,50,0.8)'
    }),

    control: (_, { selectProps: { width } }) => ({
      width: width
    }),

    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1
      const transition = 'opacity 300ms'

      return { ...provided, opacity, transition }
    }
  }
  /*
d-flex
.d-inline-flex
.d-sm-flex
.d-sm-inline-flex
.d-md-flex
.d-md-inline-flex
.d-lg-flex
.d-lg-inline-flex
.d-xl-flex
.d-xl-inline-flex

  */

  return props.issues.length?(
    <div>
      <div className='IssueList'>
        <h1>Issue Details, Total:{props.issues !==null?props.issues.length:null}</h1>
        <div className="d-flex flex-row-start ml-1">
          <div className="d-flex flex-row-around ml-3">
            <h5 style={ { color:'blue' }}> Sort by:</h5>
          </div>

          <div className="d-flex flex-row-around ml-3">
            <Select
              options={options}
              onChange={onChange}
              styles={styles}
            /></div>

        </div>
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
                <IssueDetails key={issue.id} user={props.user} option={props.option} setOptions={props.setOptions} issueSelect={props.issueSelect}
                  setIssueSelect={props.setIssueSelect} issue={issue} addLabel={props.addLabel} labels={props.labels} setInfoMessage={props.setInfoMessage}
                  setIssues={props.setIssues} handleDelete={handleDelete}
                />
              )
              :null}
          </tbody>
        </Table>
      </div>
      <div className="d-flex flex-row-reverse bd-highlight">
        <PaginationIssue sort={props.sort} setSort={props.setSort} totalPage={props.totalPage} issueLength={props.issueLength} setStart={props.setStart}
          setCount={props.setCount}  setIssues={props.setIssues} setCheckError={props.setCheckError}/>
      </div>
    </div>
  ):(<LoadingSpinner/>)
}