/*eslint-disable */
 
import React, { Component } from 'react';
import '../App.css';

export default class WorksFlow extends Component {
    state = {
        tasks: [
            {name:"Learn Angular",category:"backblog", bgcolor: "yellow"},
            {name:"React", category:"started", bgcolor:"pink"},
            {name:"Vue", category:"complete", bgcolor:"skyblue"},
            {name:"Yuka", category:"started", bgcolor:"pink"}
          ]
    }

    onDragStart = (ev, id) => {
        // console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
        // setTimeout(() => { ev.target.style.display='none'},0)
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       console.log("cat--"+id+cat);
       let tasks = this.props.issues.filter((task) => {
        //    console.log(id+" drop "+task.title);
           if (task.title === id) {console.log("drop if--"+task.state.name);
               task.state.name = cat;


            //    --------------------------------------------
    // const id =task.id
    // const title= task.title
    // const description=task.description
    // const sendingLabel = task.labels.map(label => ({ text:label.text,color:label.color }))
    // const sendingAssignees = task.assignees.map(item => item.id )
    // const sendingStates = stateValue
    // issueService.update( {
    //   id: id,
    //   title: title,
    //   description: description,
    //   labels:sendingLabel,
    //   assignees:sendingAssignees,
    //   state:sendingStates//It should be id name, order_no
    // }).then(returnedObj => {
    //   props.setIssues( old => {
    //     old = old.filter (obj =>  obj.id !==id )
    //     props.setInfoMessage(`${returnedObj.title} updated`)
    //     setTimeout( () => {
    //       props.setInfoMessage(null)
    //     }, 5000)
    //     return old.concat(returnedObj)
    //   })
    // })
    //   .catch(error => {
    //     props.setCheckError(`Error: ${error.message}`)
    //     setTimeout( () => {
    //       props.setCheckError(null)
    //     }, 5000)
    //   })
            // ---------------------------------------------------
           }
           return task;
       });

       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        let tasks = 
        {

            complete: [],
            backblog: [],
            started: [],
            finished: [],
            inTest: [],
            done: []
        }

        // this.props.stateList.forEach ((t) => {console.log("t ",t);
        //             // let column=[];
                    
        //             // t.name=[];
        //             tasks.push(t.name=[]);
        // }), console.log(tasks);
        //     tasks[t.category].push(
        //         <div key={t.name} 
        //             onDragStart = {(e) => this.onDragStart(e, t.name)}
        //             draggable
        //             className="draggable"
        //             style = {{backgroundColor: t.bgcolor}}
        console.log(this.props);
        this.props.issues.forEach ((t) => {
            // console.log(t.title);
            tasks[t.state.name].push(
                <div key={t.title} 
                    onDragStart = {(e) => this.onDragStart(e, t.title)}
                    draggable
                    className="draggable"
                    style = {{backgroundColor: t.bgcolor}}
                >
                    {t.title}
                </div>
            );
        });

        return (
            <div className="container-drag">
                <h2 className="header">DRAG & DROP DEMO</h2>
                <div className="backblog"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "backblog")}}>
                    <span className="task-header">BACKLOG</span>
                    {tasks.backblog}
                </div>
                <div className="started"
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "started")}}>
                    <span className="task-header">STARTED</span>
                    {tasks.started}
                </div>
                <div className="droppable" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div>


            </div>
        );
    }
}
 


 