import React from 'react'//useState useEffect
import { Modal } from 'react-bootstrap'
import Select from 'react-select'


const AssignModel =(props) => {

  console.log('Users',props.userOption)

  //const [smShow, setSmShow] = useState(false)
  return (
    <Modal
      size="sm"
      show={props.smAssignShow}
      onHide={() => props.setAssignSmShow(false)}
      aria-labelledby="example-modal-sizes-title-sm"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-sm">
            Assign to User
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Select
          style={props.style}
          isMulti={props.isMulti}
          options={ props.userOption}
          onChange={props.onChangeAssign}
          defaultValue={ props.issue?props.issue.assignees.map((user) => ({
            label:user.username,
            value:user.id
          })):[]}
        />
      </Modal.Body>
    </Modal>
  )

}

export default AssignModel

