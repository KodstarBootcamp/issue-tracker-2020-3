import React, { useState } from 'react'
// import UserContext from '../userContext'
// import UserProvider from '../UserProvider'
// import { useHistory } from 'react-router'
import { Button } from 'reactstrap'
import '../../App.css'
import logo from '../../images/coding.jpg'
// import ModelPopup from './ModelPopup'
import{ Link } from 'react-router-dom'
import loginService from '../../services/ApiSignIn'

const buttonStyle = { maxWidth: 200, margin: '20px  auto 10px ' }

const UserSignIn = (props) => {
  //whatever user types reseting the value
  const [values, setValues] = useState({ username: '', password: '', })

  const handleChange = event => {
    const { name, value } = event.target
    setValues({
      ...values,
      [name]: value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault() // this way not refreshing when clicking submit
    try {
      const user = await loginService.login({ username:values.username, password:values.password })
      window.localStorage.setItem(
        'loggedIssueAppUser', JSON.stringify(user)
      )
      loginService.setToken(user.token)
      props.setUser(user)

    } catch (exception) {
      props.setCheckError(`Error: ${exception.message}`)
      setTimeout(() => {
        props.setCheckError(null)
      }, 5000)
    }

    setValues({ username: '', password: '' })

  }

  return (
    <div className= "welcome">
      <img className="img-responsive" id="logo" src={logo} alt="logo" />
      <div id='welcome_msg'>
        <h3>Sign in Page</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            name="username"
            type="username"
            placeholder='User Name'
            value={values.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            name="password"
            type="password"
            placeholder='Password'
            value={values.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <div id="welcome_buttons " style={buttonStyle}>
            <Button  color="success" bsstyle="primary" bssize="large" block type="submit"> Log In </Button>
          </div>
          <hr></hr>
          <p>if you are not registered</p>
          <hr></hr>
          <div id="welcome_buttons" style={buttonStyle}>
            <Link to ="/UserSignUp">
              <Button   bsstyle="primary" bssize="large" block>to register </Button>
            </Link>
          </div>
        </div>
        {/* {pop.showPopup ?
          <ModelPopup
            text={pop.text}

          />
          : null
        } */}
      </form>
    </div>
  )
}

export default UserSignIn
