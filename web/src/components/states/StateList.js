import React from 'react'
import { useState } from 'react'
import { Table, Button } from 'react-bootstrap'//
import stateService from '../../services/ApiState'
import { SelectFormModal } from '../modals/SelectFormModal'
import { StateDetails } from './StateDetails'


export const StateList = ( props ) => {
  const [smStateListShow, setSmStateListShow] = useState(false)

  const handleDelete=( id ) => {
    const stateDelete = props.stateList.find(b => b.id === id)
    if (window.confirm(`Do you want to delete '${stateDelete.name}'?`)) {
      stateService.deleteOneState(id).then(() => {
        props.setStateList(props.stateList.filter(p => p.id !== id))
        props.setInfoMessage(`'${stateDelete.name}' deleted`)
        setTimeout(() => {
          props.setInfoMessage(null)
        }, 5000)
      })
        .catch(error => {
          props.setCheckError({ text: `${error.response.data.error}`, class: 'error' })
          setTimeout(() => {
            props.setCheckError(null)
          }, 5000)
        })
    }
  }
  console.log('State list',props.stateList)

  const handleClickState= ( event ) => {//It is for state modal input
    event.preventDefault()
    setSmStateListShow(true)
  }

  return (
    <div>

      <div className="d-flex flex-row-reverse bd-highlight">
        <div className="p-2 ">
          <h1>State List, Total:{props.stateList !==null?props.stateList.length:null}</h1>
        </div>
        <div className="p-2 mr-auto flex-fill" >
          {props.user?<Button  variant="success"  onClick={handleClickState}>create state</Button>:''}
          <SelectFormModal  setSmStateListShow={setSmStateListShow} smStateShow={smStateListShow} addState={props.addState} text='Create State' />
        </div>
      </div>

      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>name</th>
            <th>order_no</th>
            {props.user&&<th>Edit</th>}
            {props.user&&<th>Delete</th>}
          </tr>
        </thead>
        <tbody>
          {props.stateList!==null ?
            props.stateList.map((state) =>
              <StateDetails user={props.user} key={state.id} state={state} setInfoMessage={props.setInfoMessage} setStateList={props.setStateList} handleDelete={handleDelete} />//
            )
            :<>{props.checkError}</>
          }
        </tbody>
      </Table>

    </div>
  )
}

