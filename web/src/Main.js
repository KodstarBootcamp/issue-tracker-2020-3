import React,* as react from 'react'
import { useEffect } from 'react'
import { IssueCreateForm } from './components/issues'
import issueService from './services/ApiIssues'
import labelService from './services/ApiLabels'
import { IssueList } from './components/issues'
import { Switch, Route,useHistory
} from 'react-router-dom'
import { LabelList } from './components/labels'

export const Main =(props) => {
  const [issues, setIssues] = react.useState([])
  const [labels,setLabels]=React.useState([])
  const [option,setOptions] =react.useState([])
  const [issueSelect,setIssueSelect] = react.useState(false)
  const [labelSelect,setLabelSelect] = react.useState(false)
  const [viewIssueEdit,setViewIssueEdit] = react.useState(false)
  const history = useHistory()

  const getIssueData = async () => {
    try{
      const issues  = await issueService.getAll()
      setIssues( issues )
        .catch(err => console.log(err))
    }catch(err){
      props.setCheckError(`Error: ${err.message}`)
      setTimeout(() => {
        props.setCheckError(null)
      }, 3000)
    }
  }

  const getLabelData = async () => {
    try{
      const labels  = await labelService.getAll()
      const uniques = [...new Set(labels)]
      const allOptions = uniques.map((item) => ({ label: item.text,value:item.color }))
      setOptions(allOptions)
      setLabels( labels )
    }catch(err){
      props.setCheckError(`Error: ${err.message}`)
      setTimeout(() => {
        props.setCheckError(null)
      }, 5000)
    }
  }

  useEffect(() => {
    getLabelData()
    getIssueData()
  },
  [])

  const addIssue = (issueObject) => {

    issueService
      .create(issueObject)
      .then(returnedIssue => {
        setIssues(issues.concat(returnedIssue))
        props.setInfoMessage(`a new issue ${returnedIssue.title} added`)
        history.push('/issuelist')
      })
      .catch(error => {
        props.setCheckError(`Error: ${error.message}`)
        history.push('/addnew')
      })

    setTimeout(() => {
      props.setInfoMessage(null)
      props.setCheckError(null)
    }, 5000)
  }


  const addLabel = (labelObject) => {
    labelService
      .create(labelObject)
      .then(returnedObj => {
        setLabels(labels.concat(returnedObj))
        getLabelData()
        props.setInfoMessage(`a new label ${returnedObj.text} added`)
        setTimeout(() => {
          props.setInfoMessage(null)
        }, 5000)
        if(labelSelect){//It is for when label created in create a new issue form
          setLabelSelect(false)
          history.push('/addnew')
        }else if (issueSelect){//It is for when label created in issue edit form
          setIssueSelect(false)
          setViewIssueEdit(false)
          history.push('/issuelist')
        }else {
          history.push('/labellist')//It is for when label created in labellist
        }
      })
  }

  return (
    <div className="container">
      <Switch>
        <Route exact path="/addnew">
          <IssueCreateForm setLabelSelect={setLabelSelect} labelSelect={labelSelect} option={option} setOptions={setOptions}
            setInfoMessage={props.setInfoMessage} createIssue={addIssue} setLabels={setLabels} labels={labels} addLabel={addLabel}
          />
        </Route>
        <Route exact path="/issuelist">
          <IssueList option={option} setOptions={setOptions} viewIssueEdit={viewIssueEdit} setViewIssueEdit={setViewIssueEdit} issues={issues} setIssues={setIssues} setInfoMessage={props.setInfoMessage} checkError={props.checkError} setCheckError={props.setCheckError}
            labels={labels} setLabels={setLabels} setIssueSelect={setIssueSelect} issueSelect={issueSelect} addLabel={addLabel}
          />
        </Route>
        <Route exact path="/labellist">
          <LabelList setInfoMessage={props.setInfoMessage} setLabels={setLabels} labels={labels} addLabel={addLabel} />
        </Route>
        <Route exact path="/">
        </Route>
      </Switch>
    </div>
  )
}