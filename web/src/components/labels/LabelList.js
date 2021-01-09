import React from 'react'
import { useState } from 'react'
import { LabelDetails } from './LabelDetails'
import { Table,Button, Modal } from 'react-bootstrap'
import labelService from '../../services/ApiLabels'
import { LabelCreateForm } from './LabelCreateForm'

export const LabelList = ( props ) => {
  const [checkError, setCheckError]=useState([])
  const [smShow, setSmShow] = useState(false)

  const handleDelete=( id ) => {
    const labelDelete = props.labels.find(b => b.id === id)
    if (window.confirm(`Do you want to delete '${labelDelete.text}'?`)) {
      labelService.deleteOneLabel(id).then(() => {
        props.setLabels(props.labels.filter(p => p.id !== id))
        props.setInfoMessage(`'${labelDelete.text}' deleted`)
        setTimeout(() => {
          props.setInfoMessage(null)
        }, 5000)
      })
        .catch(error => {
          setCheckError({ text: `${error.response.data.error}`, class: 'error' })
          setTimeout(() => {
            setCheckError(null)
          }, 5000)
        })
    }
  }
  return (
    <div>
      <div>
        <h1>Label List, Total:{props.labels !==null?props.labels.length:null}</h1>
        <div className="d-flex flex-row-reverse bd-highlight">
          {props.user?<Button onClick={() => setSmShow(true)}>create label</Button>:''}
          <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-sm">
            Create New Label
              </Modal.Title>
            </Modal.Header>
            <Modal.Body><LabelCreateForm addLabel={props.addLabel} setSmShow={setSmShow}/></Modal.Body>
          </Modal>
        </div>
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th>Title</th>
              <th>Color</th>
              {props.user?<th>Edit</th>:''}
              {props.user?<th>Delete</th>:''}
            </tr>
          </thead>
          <tbody>
            {props.labels!==null ?
              props.labels.map((label) =>
                <LabelDetails user={props.user} key={label.id} label={label} setInfoMessage={props.setInfoMessage} setLabels={props.setLabels} handleDelete={handleDelete} />
              )
              :<>{checkError}</>
            }
          </tbody>
        </Table>
      </div>
    </div>
  )
}
