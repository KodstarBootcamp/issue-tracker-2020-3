import React from 'react'
import { Table } from 'react-bootstrap'

const SearchResult = (props) => {

  return (
    <div className='table-response'>
      <Table striped bordered hover size="sm">
        <thead>
          <tr style={ { color:'green' }}>
            <th>Title</th>
            <th>Description</th>
            <th>createdby</th>
            <th>createdDate</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{props.title}</th>
            <th>{props.description}</th>
            <th>{props.createdBy}</th>
            <th>{props.createdDate}</th>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}


export default SearchResult