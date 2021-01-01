import React,{ useState, useEffect } from 'react'
import { Form, Button,Col, CardColumns } from 'react-bootstrap'
import Edit from '../services/issues'
import LabelSelect from './labels/LabelSelect'


const IssueEditForm = ( props ) => {

  const [colorlabel,setColorLabel]=useState([])//color, text
  const [option,setOptions] =useState([])
  console.log('color label',colorlabel)
  useEffect( async() => {
    const labels= props.labels
    // labels.map((ıtem) => setOption({ label:ıtem.text,value:ıtem.color }))
    const uniques = [...new Set(labels)]
    const allOptions = uniques.map((item) => ({ label: item.text,value:item.color }))
    setOptions(allOptions)
  },
  [])

  const handleSubmit = ( event ) => {
    event.preventDefault()
    const id= props.issue.id
    const title= event.target.title.value
    const description=event.target.description.value
    event.target.title.value = ''
    event.target.description.value = ''
    Edit.update( {
      id: id,
      title: title,
      description: description,
      labels:colorlabel,
    }).then(returnedObj => {
      props.setData( old => {
        old = old.filter (obj =>  obj.id !==id )
        props.setInfoMessage(`${returnedObj.title} updated`)
        setTimeout( () => {
          props.setInfoMessage(null)
        }, 5000)
        return old.concat(returnedObj)
      })
    })
    props.setView(false)
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
  return (
    <div>
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
          <Form.Group as={Col} md="4" controlId="validationCustom03" className="ml-3">
            <Form.Label>labels</Form.Label>
            <div>
              <LabelSelect style={styles.select} option={option} isMulti={true}  onChange={onChangeInput}/>
            </div>
          </Form.Group>
        </Form.Row>
        <Form.Group as={CardColumns}>
          <Col className="ml-3">
            <Button type="submit">update</Button>
            <Button  variant="danger" onClick={() => props.setView(false)} >cancel</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  )
}
export default IssueEditForm
