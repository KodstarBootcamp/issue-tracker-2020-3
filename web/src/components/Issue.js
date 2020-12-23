import React,{useState} from 'react'
import EditForm from './EditForm'
import {Table, Card,Button, CardColumns, CardDeck} from 'react-bootstrap'

const Issue=({issue, handleDelete}) => {
  const [view,setView] = useState(false);
   

  return (
    <div>
      <CardDeck>
      <Card border="primary" style={{ width: '18rem' }}>
        <Card.Header as="h5">{issue.title}</Card.Header>
            {view? <EditForm key={issue.id} issue={issue} setView={setView} />:
            <Card.Body> 
             <Card.Title></Card.Title>
              <Card.Text> {issue.description} </Card.Text>
              <Card.Text>{issue.labels}</Card.Text>
              <Button onClick={ () => setView(true)}>Edit </Button>
              <Button onClick={ () => handleDelete(issue.id)} variant="danger"  >Delete</Button>
              {/*
 <CardColumns> Card Colums-1 for try
                <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header as="h5">{issue.title}</Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text> {issue.description} </Card.Text>
                    <Card.Text>{issue.labels}</Card.Text>
                    <Button onClick={ () => handleEdit(issue.id)}>Edit </Button>
                    <Button onClick={ () => handleDelete(issue.id)} variant="danger"  >Delete</Button>
                  </Card.Body>
                </Card>
            </CardColumns>
            <CardColumns> Card Colums -2 for try
                <Card border="primary" style={{ width: '18rem' }}>
                <Card.Header as="h5">{issue.title}</Card.Header>
                <Card.Body>
                    <Card.Title></Card.Title>
                    <Card.Text> {issue.description} </Card.Text>
                    <Card.Text>{issue.labels}</Card.Text>
                    <Button onClick={ () => handleEdit(issue.id)}>Edit </Button>
                    <Button onClick={ () => handleDelete(issue.id)} variant="danger"  >Delete</Button>
                  </Card.Body>
                </Card>
            </CardColumns>
              */
           }
             
            </Card.Body>
            }
            </Card>
      </CardDeck>
      </div>
    /*
      <tr>
            <td>{issue.title} </td>
            <td>{issue.description}</td>
            <td>{issue.labels}
            <td>xx</td><td>yyy </td>
            </td>
            <td><Button onClick={ () => handleEdit(issue.id)}>Edit </Button></td>
            <td><Button onClick={ () => handleDelete(issue.id)} variant="danger"  >Delete</Button></td>
      </tr>
      */
  );
}

export default Issue;

/*

menüler
home  new 

-------------x edit delete
----------- edit delete 
-------------- edit delete 

edit-update
delete

*/
