import React from "react";
import { useState, useEffect } from "react";
import issueService from '../services/issues';
import Issue from './Issue'
import Delete from '../services/issues'

const ViewIssue = (props) => {
 const [data, setData]=useState(null );
 const [checkError, setCheckError]=useState([])

 const getData=async ()=>{

    try{
        const issues= await issueService.getAll()
        setData( issues )
        .catch(err => console.log(err))
        }catch(err){
        setCheckError(err.message)
        }
        }
    useEffect(()=>{
        getData()
        },// eslint-disable-next-line react-hooks/exhaustive-deps
         []) 

        const handleDelete=(id) => {
            const issueDelete = data.find(b => b.id === id)
            if (window.confirm(`Do you want to delete '${issueDelete.title}'?`)) {
                Delete.deleteOneIssue(id).then(response => {
                  setData(data.filter(p => p.id !== id))
                  props.setInfoMessage(`'${issueDelete.title}' deleted`)
                  setTimeout(() => {
                    props.setInfoMessage(null)
                  }, 5000)
                })
                .catch(error => {
                    setCheckError({ text: `${error.response.data.error}`, class: 'error' })
                })
            }
          }
 return (
 <div>
      <div>
        <h1>Issue Details, Total:{data!==null?data.length:null}</h1>
        {data!==null ?  
          data.map((issue) =>
            // eslint-disable-next-line indent
                <Issue key={issue.id} issue={issue} setInfoMessage={props.setInfoMessage}setData={setData} handleDelete={handleDelete} />
            )
            :<p>{checkError}</p> 
        }
        </div>
 </div>
 )
}
 
export default ViewIssue;
