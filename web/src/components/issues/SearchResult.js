import React from 'react'
import { Table } from 'react-bootstrap'

const SearchResult = (props) => {
  return (
    <div className='table-response'>
      <h5><p>-----------------</p> </h5>
      <Table striped bordered hover size="sm">
        <thead>
          <tr style={ { color:'green', backgroundColor: 'lightblue' } }>
            <th>Title</th>
            <th>Description</th>
            <th>createdby</th>
            <th>createdDate</th>
            <th>assignee</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{props.title}</th>
            <th>{props.description}</th>
            <th>{props.createdBy}</th>
            <th>{props.createdDate}</th>
            <th> {props.assign[0].username} </th>
          </tr>
        </tbody>
      </Table>
      <hr></hr>
    </div>
  )
}


export default SearchResult