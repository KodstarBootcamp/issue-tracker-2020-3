import React, { useState } from 'react'
import { BsTrash, BsPencil } from 'react-icons/bs'
import { StateEditForm } from './StateEditForm'

export const StateDetails = ( props ) => {
  const [viewStateEdit,setViewStateEdit] = useState(false)

  return (
    <tr>
      <td>
        {viewStateEdit&&
            <StateEditForm key={props.state.id} state={props.state} setStateList={props.setStateList} stateList={props.stateList} setIssues={props.setIssues}
              setInfoMessage={props.setInfoMessage} setViewStateEdit={setViewStateEdit}/>}
        {!viewStateEdit&&<>{props.state.name}</>}
      </td>
      <td >{props.state.order_no} </td>
      {props.user&&<td ><BsPencil  onClick={() => setViewStateEdit(true)} style={{ color: 'blue' }} className="ml-4" size={16} /></td>}
      {props.user&&<td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.state.id)} className="ml-1" /></td>}
    </tr>
  )
}
