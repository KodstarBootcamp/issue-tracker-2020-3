import React,* as react from 'react'
import { useEffect } from 'react'
import CreateIssueForm from './components/CreateIssueForm'
import issueService from './services/issues'
import labelService from './services/labels'
import ViewIssue from './components/ViewIssue'
import Navigation from './components/Navigation'
import { Switch, Route,useHistory
} from 'react-router-dom'
import Info from './components/Info'
import ViewLabel from './components/labels/ViewLabel'

const App=() => {
  const history = useHistory()
  const [issues, setIssues] = react.useState([])
  const [infoMessage,setInfoMessage]=react.useState(null)
  const [labels,setLabels]=React.useState([])
  const [checkError, setCheckError]=React.useState([])
  const getData = async () => {
    try{
      const labels  = await labelService.getAll()
      setLabels( labels )
        .catch(err => console.log(err))
    }catch(err){
      setCheckError(err.message)
    }
  }

  useEffect(() => {
    getData()
  },
  [])


  const addIssue = ( issueObject ) => {
    issueService
      .create(issueObject)
      .then(returnedIssue => {
        setIssues(issues.concat(returnedIssue))
        setInfoMessage(`a new issue ${returnedIssue.title} added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        history.push('/issuelist')
      })
  }
  return (
    <div className="container">
      <Navigation />
      <Info message={infoMessage} />
      <Switch>
        <Route exact path="/addnew">
          <CreateIssueForm createIssue={addIssue} labels={labels}/>
        </Route>
        <Route exact path="/issuelist">
          <ViewIssue setInfoMessage={setInfoMessage} checkError={checkError} setCheckError={setCheckError} labels={labels}/>
        </Route>
        <Route exact path="/labellist">
          <ViewLabel setInfoMessage={setInfoMessage} />
        </Route>
        <Route exact path="/">
        </Route>
      </Switch>
    </div>
  )
}
export default App
