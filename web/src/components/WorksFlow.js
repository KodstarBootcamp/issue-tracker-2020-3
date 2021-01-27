/*eslint-disable */
 
import React, { Component } from 'react';
import '../App.css';

export default class WorksFlow extends Component {
    
    onDragStart = (ev, id) => {
        // console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
        setTimeout(() => { ev.target.style.display='none'},0)
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       console.log("cat--"+id+" to "+cat);
       let tasks = this.props.issues.filter((task) => {
        //    console.log(id+" drop "+task.title);
           if (task.title === id) {console.log("drop if--"+task.state.name);
               task.state.name = cat;
                console.log(task.state.id);

            //    --------------------------------------------
  
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
 


 