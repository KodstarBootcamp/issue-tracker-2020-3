import React, { useState } from 'react'
import { ButtonGroup,Button } from 'react-bootstrap'

const SearchBar = (props) => {
  const [searchValue, setSearchValue] = useState('')

  const handleChange= (e) => {
    setSearchValue(e.target.value)
  }
  const resetInputField =() => {
    setSearchValue('')
  }
  const callSearch= (e) => {
    e.preventDefault()
    props.clickSearch(searchValue)
    resetInputField()
  }

  const BarStyling = { width:'10rem',background:'#F2F1F9', border:'none', padding:'0.5rem' }
  return (
    <div className='d-flex' >
      <div className='p-2'>
        <input
          style={BarStyling}
          key="search1"
          value={searchValue}
          placeholder={'search issue'}
          onChange={handleChange}
        />
      </div>
      <div className='p-2'>
        <ButtonGroup className="mr-2" aria-label="Second group">
          <Button variant="success"  onClick={callSearch}>search</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}

export default SearchBar