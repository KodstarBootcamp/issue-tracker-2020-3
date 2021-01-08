
import React, { useState } from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, Button, NavbarToggler, Collapse } from 'reactstrap'
import '../App.css'
import logo from '../logo.svg'
import { Link } from 'react-router-dom'
import signOutService from '../services/ApiIssues'

const Navigation = (props) => {
  const [isOpen, setIsOpen] = useState(true)
  const toggle = () => setIsOpen(!isOpen)

  const signOut=() => {
    window.localStorage.removeItem('loggedIssueAppUser')
    props.setUser(null)
    signOutService.setToken(null)
  }

  return (
    <div>
      <Navbar color="warning" light expand="md">
        <NavbarBrand><img id="navlogo" src={logo} alt="logo" /></NavbarBrand>
        <NavbarToggler onClick={toggle} className="mr-2 mt-1 " />
        <Collapse isOpen={!isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem  id="custom_button" className="nav_button px-2 ">
              <Link to="/">
                <Button  className="btn-md  col-sm-6 col-md-12" outline color="danger">Home</Button>
              </Link>
            </NavItem>
            <NavItem  id="custom_button" className="nav_button px-2">
              <Link to="/addnew">
                <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">Create New Issue</Button>
              </Link>
            </NavItem>
            <NavItem  id="custom_button"className="nav_button px-2">
              <Link to="/issuelist">
                <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">Issue List</Button>
              </Link>
            </NavItem>
            <NavItem  id="custom_button"className="nav_button px-2">
              <Link to="/labellist">
                <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">Label List</Button>
              </Link>
            </NavItem>
            <NavItem  id="custom_button"className="nav_button px-2">
              <Link to="/userSignIn">
                {!props.user?
                  <Button   className="btn-md  col-sm-6 col-md-12" outline color="success">User Sign IN</Button>
                  :''}
              </Link>
            </NavItem>
            <NavItem  id="custom_button"className="nav_button px-2">
              {props.user?
                <Button  onClick={signOut} className="btn-md  col-sm-6 col-md-12" outline color="danger">User Sign OUT</Button>
                :''}
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      {props.user?
        <Button  className="btn-md  col-sm-6 col-md-2"  color="danger">{props.user.username}<br/>
              Loged In
        </Button>:''}
    </div>
  )
}
export default Navigation
