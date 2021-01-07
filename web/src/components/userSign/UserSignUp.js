import React, { useState } from 'react'
// import UserProvider from '../UserProvider'
import { Button, Card, CardBody, Col, Container,
  Form, Input, InputGroup, Row } from 'reactstrap'
// import ModelPopup from './ModelPopup'
// import logo from '../../images/coding.jpg'
import '../../App.css'

const UserSignUp = () => {
  const initialInputState = { userName: '', email: '', password:'', password2:'' }
  const [userData, setUserData] = useState(initialInputState)
  const { userName, email, password, password2 } = userData


  const handleChange= ( e ) => {
    e.preventDefault()
    setUserData({ ...userData, [e.target.name]:e.target.value })
  }

  const addUser = () => {

    if(password!==password2){
      alert('Ooppps ! Your password doesn`t match')

    }else{

      const addUserInfo = { userName, email, password }
      console.log(addUserInfo)
    }
  }

  return(
    <div className="app flex-row align-items center">
      {/* <img className="img-responsive" id="logo" src={logo} alt="logo" /> */}
      <Container>
        <Row className='justify-content-center'>

          <Col md='9' lg='7' xl='6'>
            <Card className='mx-4'>
              <CardBody className='p-4'>
                <Form>
                  <div className="mb-2 pageheading">
                    <div className='col-sm-12 btn btn-primary'>
                              Sign Up
                    </div>
                  </div>
                  <InputGroup className='mb-3'>
                    <Input type='text'
                      onChange={handleChange}
                      name='userName'
                      value={userName}
                      placeholder='User Name' required></Input>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Input required
                      type='text'
                      name = 'email'
                      value = {email}
                      onChange={handleChange}
                      placeholder='email'></Input>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Input required
                      type='password'
                      name = 'password'
                      value = {password}
                      onChange={handleChange}
                      placeholder='password'></Input>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Input required
                      type='password'
                      name = 'password2'
                      value = {password2}
                      onChange={handleChange}
                      placeholder='confirm password'></Input>
                  </InputGroup>
                  <Button onClick={addUser} color='success' block>Create Account</Button>
                  {/* {this.state.showPopup ?
                    <ModelPopup
                      text={this.state.text}
                      closePopup={this.togglePopup.bind(this)}
                    />
                    : null
                  } */}
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>

      </Container>
    </div>
  )
}
export default UserSignUp