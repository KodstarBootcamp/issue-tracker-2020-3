import React,{ useState } from 'react'
import { LabelEditForm } from './LabelEditForm'
import { BsTrash, BsPencil } from 'react-icons/bs'

export const LabelDetails = ( props ) => {
  const [viewLabelEdit,setViewLabelEdit] = useState(false)

  return (
    <tr>
      <td>
        {viewLabelEdit&&
          <LabelEditForm key={props.label.id} label={props.label} setLabels={props.setLabels} setIssues={props.setIssues}
            setInfoMessage={props.setInfoMessage} setViewLabelEdit={setViewLabelEdit}/>}
        {!viewLabelEdit&&<>{props.label.text}</>}
      </td>
      <td style={{ color: '#fcf8f8', backgroundColor: props.label.color }}>{props.label.color} </td>
      {props.user&&<td ><BsPencil  onClick={() => setViewLabelEdit(true)} style={{ color: 'blue' }} className="ml-4" size={16} /></td>}
      {props.user&&<td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.label.id)} className="ml-1" /></td>}
    </tr>
  )
}
