import React from 'react'
//import ReactDOM from 'react-dom'
import Draggable from 'react-draggable'
//import { Row, Col } from 'react-simple-flex-grid'
import 'react-simple-flex-grid/lib/main.css'
//import {DraggableCore} from 'react-draggable'
//import Board from 'react-trello'


const WorkFlow = (props) => {

  const handleStart = event => {
    event.preventDefault()
    console.log('Mouse Over')
    // Turn the endzone red, perhaps?
  }

  const handleDragLeave = event => {
    event.preventDefault()
    console.log('Mouse leaving')
    // Bring the endzone back to normal, maybe?
  }

  const handleDrop = event => {
    event.preventDefault()
    console.log('Mouse drop')
    // Add a football image to the endzone, initiate a file upload,onDragOver={onDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
    // steal the user's credit card
  }
  return (
    <div className='d-flex'>
      <div className='d-row  p-2'>
        <h5>backblog</h5>
        <div className='p-2'>
          <div className="handle border border-primary">{props.stateList.map(state =>
            <Draggable key={state.id} scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}><div >{state.name} </div>
            </Draggable>
          )}
          </div>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 2 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 3 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 4 Drag from here</div>
            </div>
          </Draggable>
        </div>
      </div>
      <div className='d-row p-2'>
        <h5>Started</h5>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div className="handle border border-primary">Second 1 Drag from here</div>
            </div>
          </Draggable>
        </div >
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Second 2 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary">Second 3 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary">Second 4 Drag from here</div>
            </div>
          </Draggable>
        </div>
      </div>
      <div className='d-row p-2'>
        <h5>Finished</h5>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div className="handle border border-primary">Bigining first Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 2 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 3 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 4 Drag from here</div>
            </div>
          </Draggable>
        </div>
      </div>
      <div className='d-row p-2'>
        <h5>In test</h5>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div className="handle border border-primary">Bigining first Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 2 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 3 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 4 Drag from here</div>
            </div>
          </Draggable>
        </div>
      </div>
      <div className='d-row p-2'>
        <h5>Done</h5>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div className="handle border border-primary">Bigining first Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 2 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 3 Drag from here</div>
            </div>
          </Draggable>
        </div>
        <div className='p-2'>
          <Draggable axis="x"  handle=".handle"  defaultPosition={{ x: 0, y: 0 }} position={null}  grid={[25, 25]}
            scale={1} onStart={handleStart} onDrag={handleDragLeave} onStop={handleDrop}>
            <div >
              <div  className="handle border border-secondary"> Bigining first 4 Drag from here</div>
            </div>
          </Draggable>
        </div>
      </div>
    </div>
  )

}






/*
  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Planned Tasks',
        label: '4/4',
        cards: [
          { id: 'Card1', title: 'Snow Kind', description: 'Descriptions', label: '30 mins', draggable: true },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } },
          { id: 'Card3', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } },
          { id: 'Card4', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
        ]
      },
      {
        id: 'lane2',
        title: 'To do',
        label: '0/0',
        cards: [ { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: true },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }]
      },
      {
        id: 'lane3',
        title: 'progress',
        label: '0/0',
        cards: [ { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: true },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }]
      },
      {
        id: 'lane4',
        title: 'Done',
        label: '0/0',
        cards: [ { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: true },
          { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }]
      }
    ]
  }

  const handleDragLeave = event => {
    event.stopPropogation()
    event.preventDefault()
    console.log('Mouse leaving')
    // Bring the endzone back to normal, maybe?
  }
  const onDragStart = event => {
    event.stopPropogation()
    event.preventDefault()
    console.log('Mouse Over')
    // Turn the endzone red, perhaps?
  }
  const handleDragEnter = event => {
    event.stopPropogation()
    event.preventDefault()
    console.log('Mouse Enter')
    // Play a little sound, possibly?
  }
  const handleDrop = event => {
    event.stopPropogation()
    event.preventDefault()
    console.log('Mouse drop')
    // Add a football image to the endzone, initiate a file upload,onDragOver={onDragOver} onDragEnter={handleDragEnter} onDragLeave={handleDragLeave} onDrop={handleDrop}
    // steal the user's credit card
  }
  return (
    <div className={'endzone'} >
      <p>The Drop Zone</p>
      <div >
        <Board data={data} onDragStart={onDragStart}  />
        <div className="draggablediv" draggable="true" onDragStart={onDragStart} onDragEnd={handleDragLeave}>Maybe Im a ball?</div>
      </div>
    </div>

return (
<div style={{display: 'flex',flexDirection: 'column'}}>
<div style={{height: 500,padding: 20}}>
<Unknown id="board1" data={{lanes: [
      {
        id: 'PLANNED',
        title: 'Disallowed adding card',
        label: '20/70',
        …
      },
      {
        id: 'WIP',
        title: 'Work In Progress',
        label: '10/20',
        …
      },
      {
        id: 'BLOCKED',
        title: 'Blocked',
        label: '0/0',
        …
      },
      …
    ]}} draggable />
</div>
<div style={{height: 500,padding: 20}}>
<Unknown id="board2" data={{lanes: [{
        id: 'yesterday',
        title: 'Yesterday',
        label: '20/70',
        …
      },{
        id: 'today',
        title: 'Today',
        label: '10/20',
        …
      },{
        id: 'tomorrow',
        title: 'Tomorrow',
        label: '0/0',
        …
      }]}} draggable />
</div>
</div>
  )
*/


export default WorkFlow