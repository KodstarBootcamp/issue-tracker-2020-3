import React,{ useState } from 'react'
import LabelEditForm from './LabelEditForm'
import { Card } from 'react-bootstrap'
import { BsTrash, BsPencil } from 'react-icons/bs'
const Label = ( props ) => {
  const [viewLabel]= useState(false)
  const [view,setView] = useState(false)

  return (
    <tr>
      <td>
        <div className="d-flex justify-content-start">
          {view?<LabelEditForm key={props.label.id} label={props.label} setDataLabel={props.setDataLabel} setData={props.setData} setInfoMessage={props.setInfoMessage} setView={setView} />:
            !viewLabel?props.label.text:''}
          {viewLabel?<Card.Body>
            <h5>Title:</h5>
            <Card.Text>{props.label.text}</Card.Text>
            <h5>Color:</h5>
            <Card.Text> {props.label.color} </Card.Text>
          </Card.Body>:''}
        </div>
      </td>
      <td style={{ color: '#fcf8f8', backgroundColor: props.label.color }}>{props.label.color} </td>
      <td ><BsPencil  onClick={() => setView(true)} style={{ color: 'blue' }} className="ml-4" size={16} /></td>
      <td><BsTrash style={{ color: 'red' }} onClick={ () => props.handleDelete(props.label.id)} className="ml-1" /></td>
    </tr>
  )
}
export default Label
