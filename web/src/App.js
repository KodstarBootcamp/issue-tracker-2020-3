import React,* as react from 'react'
import { useEffect } from 'react'
import CreateIssueForm from './components/CreateIssueForm'
import issueService from './services/issues'
import labelService from './services/labels'
import ViewIssue from './components/ViewIssue'
import Navigation from './components/Navigation'
import { Switch, Route,useHistory
} from 'react-router-dom'
import { Info, Error } from './components/Notification'
import ViewLabel from './components/labels/ViewLabel'

const App=() => {
  const history = useHistory()
  const [issues, setIssues] = react.useState([])
  const [infoMessage,setInfoMessage]=react.useState(null)
  const [labels,setLabels]=React.useState([])
  const [checkError, setCheckError]=React.useState(null)
  const [option,setOptions] =react.useState([])
  const [labelSelect,setLabelSelect] = react.useState(false)
  const [issueSelect,setIssueSelect] = react.useState(false)

  const getData = async () => {
    try{
      const labels  = await labelService.getAll()
      const uniques = [...new Set(labels)]
      const allOptions = uniques.map((item) => ({ label: item.text,value:item.color }))

      setOptions(allOptions)
      setLabels( labels )

    }catch(err){
      setCheckError(`Error: ${err.message}`)
      setTimeout(() => {
        setCheckError(null)
      }, 5000)
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
        history.push('/issuelist')
      })
      .catch(error => {
        setCheckError(`Error: ${error.message}`)//error.response.data.error
        console.log('Error',error.response.message)
        history.push('/addnew')
      })

    setTimeout(() => {
      setInfoMessage(null)
      setCheckError(null)
    }, 5000)
  }


  const addLabel = ( labelObject ) => {
    labelService
      .create(labelObject)
      .then(returnedObj => {
        setLabels(labels.concat(returnedObj))
        getData()
        setInfoMessage(`a new label ${returnedObj.text} added`)
        setTimeout(() => {
          setInfoMessage(null)
        }, 5000)
        if(labelSelect){//It is for when label created in create new issue form
          setLabelSelect(false)
          history.push('/addnew')
        }else if (issueSelect){//It is for when label created in issue edit form
          setIssueSelect(false)
          history.push('/issuelist')
        }else {
          history.push('/labellist')//It is for when label created in labellist
        }
      })
  }


  return (
    <div className="container">
      <Navigation />
      <Info info={infoMessage} />
      <Error error={checkError} />
      <Switch>
        <Route exact path="/addnew">
          <CreateIssueForm setLabelSelect={setLabelSelect} labelSelect={labelSelect} option={option} setOptions={setOptions}
            setInfoMessage={setInfoMessage} createIssue={addIssue} setLabels={setLabels} labels={labels} addLabel={addLabel}
          />
        </Route>
        <Route exact path="/issuelist">
          <ViewIssue setInfoMessage={setInfoMessage} checkError={checkError} setCheckError={setCheckError}
            labels={labels} setIssueSelect={setIssueSelect} issueSelect={issueSelect} addLabel={addLabel}
          />
        </Route>
        <Route exact path="/labellist">
          <ViewLabel setInfoMessage={setInfoMessage} setLabels={setLabels} labels={labels} addLabel={addLabel} />
        </Route>
        <Route exact path="/">
        </Route>
      </Switch>
    </div>
  )
}
export default App
