import React,* as react from 'react'
import Navigation from './components/Navigation'
import { Info, Error } from './components/Notification'
import { Main } from './Main'

const App = () => {
  const [infoMessage,setInfoMessage]=react.useState(null)
  const [checkError, setCheckError]=React.useState(null)

  return (
    <div className="container">
      <Navigation />
      <Info info={infoMessage} />
      <Error error={checkError} />
      <Main info={infoMessage} error={checkError} setInfoMessage={setInfoMessage} setCheckError={setCheckError}/>
    </div>
  )
}
export default App
