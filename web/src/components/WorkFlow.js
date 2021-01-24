import React, { useState } from 'react'
//import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
//import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
import { Card } from 'react-bootstrap'
import { Form,  Button,Col } from 'react-bootstrap'
import { BsFillCaretDownFill,BsFillCaretUpFill } from 'react-icons/bs'
import { LabelSelect } from './labels/LabelSelect'
import { useHistory } from 'react-router-dom'
import issueService from '../services/ApiIssues'
import '../App.css'

const WorkFlow = (props) => {
  //const [setStateChoose]=useState(false)//stateChoose
  const [stateValue,setStateValue] = useState([])//It is for state update
  //const [stateVisibilityStarted,setStateVisibilityStarted] = useState(false)
  //const [stateVisibilityFinished,setStateVisibilityFinished] = useState(false)
  //const [stateVisibilityInTest,setStateVisibilityInTest] = useState(false)
  // const [stateVisibilityDone,setStateVisibilityDone] = useState(false)



  const onChangeInputState=(value) => {//It is for state update
  //  event.preventDefault()

    if (value) {

      //  setStateChoose(true)
      setStateValue(value.value)
    } else {
      // setStateChoose(true)
      setStateValue([])
    }
  }


  const handleClick = ( value ) => {
    event.preventDefault()

    const id =value.id
    const title= value.title
    const description=value.description
    const sendingLabel = value.labels.map(label => ({ text:label.text,color:label.color }))
    const sendingAssignees = value.assignees.map(item => item.id )
    const sendingStates = stateValue
    issueService.update( {
      id: id,
      title: title,
      description: description,
      labels:sendingLabel,
      assignees:sendingAssignees,
      state:sendingStates//It should be id name, order_no
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
      .catch(error => {
        props.setCheckError(`Error: ${error.message}`)
        setTimeout( () => {
          props.setCheckError(null)
        }, 5000)
      })

  }

  // const handleStart = event => {
  //  event.preventDefault()
  //  console.log('Mouse Over')
  // Turn the endzone red, perhaps?
  // }

  //  const handleDragLeave = event => {
  //  event.preventDefault()
  //   console.log('Mouse leaving')
  // Bring the endzone back to normal, maybe?
  // }

  // const handleDrop = event => {
  //  event.preventDefault()
  //  console.log('Mouse drop')
  // Add a football image to the endzone, initiate a file upload,onDragOver={onDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
  // steal the user's credit card filter (obj =>  obj.id !==id )
  // }

  const styles={
    select:{
      width:'100%',
      maxWidth:600
    }
  }

  const defaultStateValue=props.issue?[{ label:props.issue.state.name,value:props.issue.state.id }]:[]
  return (
    <div className='d-flex'>
      {props.stateList.map(state =>
        <div className='d-row  p-2' key={state.id}>
          <h5>{state.name}</h5>
          <div className='p-2'>
            <div className="handle border border-primary">{props.issues.filter((issue) => issue.state?issue.state.name===state.name:'').map(issue =>
              <StateCard issue={issue} key={issue.id} handleClick={handleClick} option={props.stateOption} styles={styles} onChange={onChangeInputState}
                defaultValue={defaultStateValue}/>// set continue
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  )

}

const StateCard =(props) => {
  const [stateVisibility,setStateVisibility] = useState(false)
  const history = useHistory()
  return(
    <Draggable key={props.issue.id} scale={1} onStart={props.handleStart} onDrag={props.handleDragLeave} onStop={props.handleDrop}>
      <Card style={{ width: '18rem'  }}>
        <Card.Header>{props.issue.title}</Card.Header>
        <Card.Body>
          <Col>Description: {props.issue.description} </Col>
          <Col>Labels: {props.issue.labels.map(label => label.text+' ' ) } </Col>
          <Col>Assigned: {props.issue.assignees.map(assign => assign.username)} </Col>
          <Form.Group as={Col} md="8" controlId="validationCustom03" >
            <Form.Label>State:</Form.Label>
            {stateVisibility&&
                    <>
                      <LabelSelect  issue={props.issue} style={props.styles.select} option={props.option} onChange={props.onChange} defaultValue={props.defaultValue}/>
                      <Button  variant="success" direction='right' onClick={() => props.handleClick(props.issue)}>update</Button>
                      <Button  variant="success" direction='right' onClick={() => history.push('/statelist')}>state list</Button>
                    </>}
            {!stateVisibility?<BsFillCaretDownFill data-testid='view' style={{ color: 'green', }} size={28} onClick={() => setStateVisibility(true)}/>
              :<BsFillCaretUpFill style={{ color: 'green' }} size={32} onClick={() => setStateVisibility(false)}/>}
          </Form.Group>
        </Card.Body>
      </Card>
    </Draggable>
  )
}


export default WorkFlow