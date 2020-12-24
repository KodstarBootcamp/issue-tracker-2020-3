import React from "react";
import { useState, useEffect } from "react";
import issueService from '../services/issues'
import { Table,Card,Button} from 'react-bootstrap'
import Issue from './Issue'
import Delete from '../services/issues'

const ViewIssue = () => {
 const [data, setData]=useState(null );
 const [checkError, setCheckError]=useState(null)

 const getData=async ()=>{

    try{
        await issueService.getAll(). then(issues =>
        setData( issues ))        

        console.log("Data is coming",data)
        console.log("Details",data.title)
    // .then(res=>console.log(res))
        .catch(err => console.log(err))
        }catch(err){
        setCheckError(err.message)
        }
        }
    useEffect(()=>{
        getData()
        },// eslint-disable-next-line react-hooks/exhaustive-deps
         []) 


         const handleDelete= (id) => {
            console.log("İD",id)
            Delete.deleteOneIssue( id)
        }


      
 return (
 <div>
      <div>
        <h1>Issue Details:</h1>
        {/*Alternative -1 Card */}
        {data!==null ?  
          data.map((issue) =>
            // eslint-disable-next-line indent
                <Issue key={issue.id} issue={issue} handleDelete={handleDelete} />
            )
            :<p>{checkError}</p> 
        }
        </div>
        <div>
            {/*
Alternative-2 Table  
 {data!==null ? 
        <Table striped>
            <thead>
                <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Labels</th>
                <th></th>
                <th></th>
                </tr>
        </thead>
          <tbody> 
            {data.map((issue) =>
            // eslint-disable-next-line indent
                <Issue key={issue.id} issue={issue} handleEdit={handleEdit} handleDelete={handleDelete} />
            )
            }
          </tbody>
        </Table>
        : <p>{checkError}</p> 
        }
            */}
       
        </div>
 </div>
 )
}
 
export default ViewIssue;