import React,{ useState } from 'react'
import issueService from '../services/ApiIssues'
import { Pagination } from 'react-bootstrap'
//import { Pagination } from 'react-pagination'

const PaginationIssue = (props) => {
  const [first, setFirst] = useState(1)
  const [limit] = useState(4)

  const getSetIssueData = async ({ clickValueStart,...props }) => {
    try{
      const start=(clickValueStart-1)*limit
      const count = limit
      //props.setStart(start)
      //props.setCount(count)
      const currentIssue  = await issueService.getAll({ start, count })
      props.setIssues( currentIssue )
        .catch(err => console.log(err))
    }catch(err){
      props.setCheckError(`Error: ${err.message}`)
      setTimeout(() => {
        props.setCheckError(null)
      }, 3000)
    }
  }


  const debugClick = async (e) => {
    const clickValue = e.target.offsetParent.getAttribute('data-page')
      ? e.target.offsetParent.getAttribute('data-page')
      : e.target.getAttribute('data-page')

    if(clickValue !==null){
      console.log('click value',clickValue)
      // eslint-disable-next-line eqeqeq
      if(clickValue == 'firstItem'){
        setFirst(1)
        console.log('First ıtem area',1)
        const clickValueStart=1
        getSetIssueData({ clickValueStart,...props })
        // eslint-disable-next-line eqeqeq
      }else if((clickValue == 'prevItem'&&first>2)||(clickValue == 'itemLeft')){
        setFirst(first-1)
        console.log('previos  and left area',first-1)
        const clickValueStart=first-1

        getSetIssueData({ clickValueStart, ...props })
        // eslint-disable-next-line eqeqeq
      } else if(clickValue == 'lastItem'){
        if(props.issueLength%limit===0){
          setFirst(props.issueLength/limit)
          console.log('Last ıtem area',props.issueLength/limit)
        }else {
          setFirst(Number.parseInt(props.issueLength/limit)+1)
          console.log('Last ıtem area',Number.parseInt(props.issueLength/limit)+1)
        }
        const clickValueStart=props.issueLength/limit
        getSetIssueData({ clickValueStart,...props })

      }else if (first<(props.issueLength/limit)) {
        setFirst(first+1)
        const clickValueStart= clickValue
        getSetIssueData({ clickValueStart,...props })
      }
    }
  }

  console.log('issue length===>',props.issueLength)


  return (
    <div className="d-flex-colums justify-content-end">
      <Pagination onClick={debugClick}>
        <Pagination.First key={0} data-page='firstItem'/>
        {first>2? <Pagination.Prev key={1} data-page='prevItem'/>:''}
        {first>1? <Pagination.Item key={2} data-page='itemLeft'>
          {first-1}
        </Pagination.Item>:''}
        <Pagination.Item active key={3} >
          {first}
        </Pagination.Item>
        {(first<props.issueLength/limit)? <Pagination.Item key={4} data-page={first+1}>
          {first+1}
        </Pagination.Item>:''}
        {(first<props.issueLength/limit)?<Pagination.Next key={5} data-page={first}/>:''}
        <Pagination.Last key={props.issueLength} data-page='lastItem' />
      </Pagination>
    </div>
  )
}

export default PaginationIssue

/*

  const [allIssues,setAllIssues ] = useState([])
  const [currentIssues,currentPage,totalPages] = useState({ allIssues:[],currentIssues:[],currentPage:null,totalPages:null })

  const totalIssues = allIssues.length
  if (totalIssues === 0) return null

  console.log('allIssues',allIssues)
  setAllIssues(props.issues )

  const onPageChanged = (data) => {
    const { allIssues } = this.state
    const { currentPage, totalPages, pageLimit } = data
    const offset = (currentPage - 1) * pageLimit
    const currentIssues = allIssues.slice(offset, offset + pageLimit)

    this.setState({ currentPage, currentIssues, totalPages })
  }


*/
