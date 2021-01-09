
import React, { useEffect,useState } from 'react'
import { IssueCreateForm } from './components/issues'
import issueService from './services/ApiIssues'
import labelService from './services/ApiLabels'
import { IssueList } from './components/issues'
import { Switch, Route,useHistory
} from 'react-router-dom'
import { LabelList } from './components/labels'
import Welcome from './components/Welcome'
import UserSignIn from './components/userSign/UserSignIn'
import UserSignUp from './components/userSign/UserSignUp'

export const Main =(props) => {
  const [totalPage,setTotalPage] = useState()
  const [limit] = useState(10)
  const [issues, setIssues] = useState([])
  const [labels,setLabels]=useState([])
  const [option,setOptions] =useState([])
  const [issueSelect,setIssueSelect] = useState(false)
  const [labelSelect,setLabelSelect] = useState(false)
  const [issuesLength, setIssuesLength] = useState()

  const history = useHistory()

  const getIssueData = async () => {
    try{
      const issues  = await issueService.getAll({ start:0, count:10 })
      const issue = await issueService.getAllIssueLength()
      const issuesLength = issue !==null?issue.length:null
      setIssuesLength(issuesLength)
      if(issuesLength !==null||issuesLength !==undefined){
        if(issuesLength%limit===0){
          const pageLength = issuesLength/limit
          setTotalPage(pageLength)
        } else{
          setTotalPage(parseInt(issuesLength/limit)+1)
        }
        setIssues( issues )
          .catch(err => console.log(err))
      }
    }catch(err){
      console.log(err.message)
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

      console.log(err.message)
      setTimeout(() => {
        props.setCheckError(null)
      }, 5000)
    }
  }

  useEffect( async () => {
    await getLabelData()
    await getIssueData()
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
          <IssueList user={props.user} totalPage={totalPage} issueLength={issuesLength}  option={option} setOptions={setOptions} issues={issues} setIssues={setIssues} setInfoMessage={props.setInfoMessage} checkError={props.checkError} setCheckError={props.setCheckError}
            labels={labels} setLabels={setLabels} setIssueSelect={setIssueSelect} issueSelect={issueSelect} addLabel={addLabel}
          />
        </Route>
        <Route exact path="/labellist">
          <LabelList user={props.user} setInfoMessage={props.setInfoMessage} setLabels={setLabels} labels={labels} addLabel={addLabel} />
        </Route>
        <Route exact path="/userSignIn">
          <UserSignIn user={props.user} setUser={props.setUser} setCheckError={props.setCheckError} />
        </Route>
        <Route exact path="/userSignUp">
          <UserSignUp setCheckError={props.setCheckError} />
        </Route>
        <Route exact path="/" >
          <Welcome user={props.user} />
        </Route>
      </Switch>
    </div>
  )
}