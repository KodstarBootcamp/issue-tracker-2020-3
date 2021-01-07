import React,{ useState } from 'react'
import { Form, ButtonToolbar,ButtonGroup, Button,Col, CardColumns,Modal } from 'react-bootstrap'
import Edit from '../../services/ApiIssues'
import { LabelSelect, LabelCreateForm } from '../labels'


export const IssueEditForm = ( props ) => {
  const [smShow, setSmShow] = useState(false)
  const [colorlabel,setColorLabel]=useState([])

  const handleSubmit = ( event ) => {
    event.preventDefault()
    const id= props.issue.id
    const title= event.target.title.value
    const description=event.target.description.value
    event.target.title.value = ''
    event.target.description.value = ''
    props.setViewIssueEdit(false)
    Edit.update( {
      id: id,
      title: title,
      description: description,
      labels:colorlabel,
    }).then(returnedObj => {
      props.setIssues( old => {
        old = old.filter (obj =>  obj.id !==id )
        props.setInfoMessage(`${returnedObj.title} updated`)
        setTimeout( () => {
          props.setInfoMessage(null)
        }, 5000)
        return old.concat(returnedObj)
      })
    })

  }

  function onChangeInput(value){
    setColorLabel(value.map(ıtem => ({ text:ıtem.label,color:ıtem.value })) )

  }
  const styles={

    select:{
      width:'100%',
      maxWidth:600
    }
  }
  const handleClick= ( event ) => {
    event.preventDefault()
    props.setIssueSelect(true)
    setSmShow(true)
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Row>
          <Form.Group as={Col} md="4" controlId="validationCustom01"  className="ml-3">
            <Form.Label>title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="title"
              defaultValue={props.issue.title}
              name="title"
            />
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02" className="ml-3">
            <Form.Label>description</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="description"
              defaultValue={props.issue.description}
              name="description"
            />
          </Form.Group>
          <Form.Group as={Col} md="8" controlId="validationCustom03" className="ml-3">
            <Form.Label>Labels:</Form.Label>
            {props.option?<>
              <LabelSelect style={styles.select} option={props.option} isMulti={true}  onChange={onChangeInput}/>
              <div className="d-flex flex-row-reverse bd-highlight" >
                <Button  variant="success"  onClick={handleClick}>create label</Button>
              </div>
            </>:null}
          </Form.Group>
        </Form.Row>
        <Form.Group as={CardColumns}>
          <Col className="ml-3">
            <ButtonToolbar aria-label="Toolbar with button groups">
              <ButtonGroup className="mr-1" aria-label="First group">
                <Button type="submit">update</Button>
              </ButtonGroup>
              <ButtonGroup className="mr-1" aria-label="Second group">
                <Button  variant="danger" onClick={() => props.setViewIssueEdit(false)} >cancel</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Form.Group>
      </Form>
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
        <Modal.Body>
          <LabelCreateForm setViewIssueEdit={ props.setViewIssueEdit } issueSelect={props.issueSelect} setIssueSelect={props.setIssueSelect} setLabelSelect={props.setLabelSelect}
            addLabel={props.addLabel} setSmShow={setSmShow}
          />
        </Modal.Body>
      </Modal>
    </>
  )
}
