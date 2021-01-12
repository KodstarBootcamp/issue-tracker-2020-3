import React from 'react'
import { Button }  from 'reactstrap'
import '../App.css'
import logo from '../images/coding.png'
import{ Link } from 'react-router-dom'

const buttonStyle = { width: 150, margin: '0 auto 10px' }


const Welcome =(props) => {

  return (
    <div className="welcome  d-flex flex-column parent justify-content-center align-items-center ">
      <img  className="img-responsive" id="logo"  src={logo} alt="logo"/>
      <div className ="mb-4" id="welcome_msg">
        <h3>Welcome to our platform</h3>
      </div>
      <div id="welcome_buttons" style={buttonStyle}>
        <Link to ="/userSignIn">
          {!props.user?
            <Button className="mb-2 "color="primary" bsstyle="primary" bssize="large" block> Login
            </Button>:''}
        </Link>
        <Link to ="/userSignUp">
          {!props.user?
            <Button color="success" bsstyle="primary" bssize="large" block> Register
            </Button>:''}
        </Link>
      </div>
    </div>
  )
}
export default Welcome
