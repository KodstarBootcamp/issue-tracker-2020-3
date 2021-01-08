import React,* as react from 'react'
import { useState } from 'react'
import Navigation from './components/Navigation'
import { Info, Error } from './components/Notification'
import { Main } from './Main'
import { useEffect } from 'react'
import loginService from './services/ApiIssues'

const App = () => {
  const [infoMessage,setInfoMessage]=react.useState(null)
  const [checkError, setCheckError]=React.useState(null)
  const [user,setUser] = useState()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedIssueAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      loginService.setToken(user.token)
    }
  }, [])
  console.log('Loged User',user)

  return (
    <div className="container">
      <Navigation user={user} setUser={setUser}/>
      <Info info={infoMessage}/>
      <Error error={checkError}/>
      <Main user={user} setUser={setUser} info={infoMessage} error={checkError} setInfoMessage={setInfoMessage} setCheckError={setCheckError}/>
    </div>
  )
}

export default App
