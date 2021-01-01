import React from 'react'
import { useState, useEffect } from 'react'
import Label from './Label'
import { Table } from 'react-bootstrap'
import labelService from '../../services/labels'

const ViewLabel = ( props ) => {
  const [dataLabel, setDataLabel]=useState(null )
  const [checkError, setCheckError]=useState([])
  const getData = async () => {
    try{
      const labels  = await labelService.getAll()
      console.log('Labels',labels)
      setDataLabel( labels )
        .catch(err => console.log(err))
    }catch(err){
      setCheckError(err.message)
    }
  }

  useEffect(() => {
    getData()
  },
  [])


  const handleDelete=( id ) => {
    const labelDelete = dataLabel.find(b => b.id === id)
    if (window.confirm(`Do you want to delete '${labelDelete.text}'?`)) {
      labelService.deleteOneLabel(id).then(() => {
        setDataLabel(dataLabel.filter(p => p.id !== id))
        props.setInfoMessage(`'${labelDelete.text}' deleted`)
        setTimeout(() => {
          props.setInfoMessage(null)
        }, 5000)
      })
        .catch(error => {
          setCheckError({ text: `${error.response.data.error}`, class: 'error' })
        })
    }
  }
  return (
    <div>
      <div>
        <h1>Label List, Total:{dataLabel !==null?dataLabel.length:null}</h1>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Color</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {dataLabel!==null ?
              dataLabel.map((label) =>
                <Label key={label.id} label={label} setInfoMessage={props.setInfoMessage} setDataLabel={setDataLabel}  handleDelete={handleDelete} />
              )
              :<>{checkError}</>
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}
export default ViewLabel
