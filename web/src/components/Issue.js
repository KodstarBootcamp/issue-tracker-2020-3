import React,{useState} from 'react'
import EditForm from './EditForm'
import {Card,Button, CardDeck} from 'react-bootstrap'

const Issue=(props) => {
  const [view,setView] = useState(false);
   

  return (
    <div>
      <CardDeck>
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header as="h5">{props.issue.title}</Card.Header>
            {view? <EditForm key={props.issue.id} issue={props.issue} setData={props.setData} setInfoMessage={props.setInfoMessage} setView={setView} />:
            <Card.Body> 
             <Card.Title></Card.Title>
              <Card.Text> {props.issue.description} </Card.Text>
              <Card.Text>{props.issue.labels}</Card.Text>
              <Button onClick={ () => setView(true)}>Edit </Button>
              <Button onClick={ () => handleDelete(props.issue.id)} variant="danger"  >Delete</Button>
            </Card.Body>
            }
            </Card>
      </CardDeck>
     </div>
 
  );
}

export default Issue;
