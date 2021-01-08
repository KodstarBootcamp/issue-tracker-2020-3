import React,{ useState } from 'react'
import issueService from '../services/ApiIssues'
import { Pagination } from 'react-bootstrap'

const PaginationIssue = (props) => {
  const [limit] = useState(10)
  const [currentPage, setCurrentPage] = useState(1)

  const getSetIssueData = async ({ clickValueStart,...props }) => {
    try{
      const start=(clickValueStart-1)*limit
      const count = limit
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
      // eslint-disable-next-line eqeqeq
      if(clickValue == 'firstItem'){
        setCurrentPage(1)
        const clickValueStart=1
        getSetIssueData({ clickValueStart,...props })
        // eslint-disable-next-line eqeqeq
      }else if((clickValue == 'prevItem'&&currentPage>2)||(clickValue == 'itemLeft')){
        setCurrentPage(currentPage-1)
        const clickValueStart=currentPage-1
        getSetIssueData({ clickValueStart, ...props })
        // eslint-disable-next-line eqeqeq
      } else if(clickValue == 'lastItem'){
        if(props.issueLength%limit===0){
          setCurrentPage(props.issueLength/limit)
          const clickValueStart=props.issueLength/limit
          getSetIssueData({ clickValueStart,...props })
        }else {
          setCurrentPage(Number.parseInt(props.issueLength/limit)+1)
          const clickValueStart=Number.parseInt(props.issueLength/limit)+1
          getSetIssueData({ clickValueStart,...props })
        }
      }else if (currentPage<(props.issueLength/limit)) {
        setCurrentPage(currentPage+1)
        const clickValueStart= clickValue
        getSetIssueData({ clickValueStart,...props })
      }
    }
  }

  return (
    <div className="d-flex-colums justify-content-end">
      <Pagination onClick={debugClick}>
        <Pagination.First key={0} data-page='firstItem'/>
        {currentPage>2?<Pagination.Prev key={1} data-page='prevItem'/>:''}
        {currentPage>2&&props.totalPage>3&&currentPage<= props.totalPage?<Pagination.Ellipsis />:''}
        {props.totalPage===currentPage&&props.totalPage>2?<Pagination.Item key={2} data-page={currentPage-2}>
          {currentPage-2}
        </Pagination.Item>:''}
        {currentPage>1?<Pagination.Item key={3} data-page='itemLeft'>
          {currentPage-1}
        </Pagination.Item>:''}
        <Pagination.Item active key={4} >
          {currentPage}
        </Pagination.Item>
        {(currentPage<props.totalPage)?<Pagination.Item key={5} data-page={currentPage+1}>
          {currentPage+1}
        </Pagination.Item>:''}
        {(currentPage===1&&props.totalPage>2)?<Pagination.Item key={6} data-page={currentPage+2}>
          {currentPage+2}
        </Pagination.Item>:''}
        {currentPage<props.totalPage-1?<Pagination.Ellipsis />:''}
        {currentPage<props.totalPage?<Pagination.Next key={7} data-page={currentPage+1}/>:''}
        <Pagination.Last key={8} data-page='lastItem' />
      </Pagination>
    </div>
  )
}

export default PaginationIssue

