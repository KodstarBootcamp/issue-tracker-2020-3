import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Card, CardBody, Col, Container,
  Form, Input, InputGroup, Row } from 'reactstrap'
import '../../App.css'
import userService from '../../services/ApiSignUp'
import ModelPopup from './ModelPopup'

const UserSignUp = (props) => {
  const initialInputState = { username: '', email: '', password:'', password2:'' }
  const [userData, setUserData] = useState(initialInputState)
  const { username, email, password, password2 } = userData
  const history = useHistory()
  const [pop, setPop] = useState({
    showPopup: false,
    text:'login'
  })

  const handleChange= ( e ) => {
    e.preventDefault()
    setUserData({ ...userData, [e.target.name]:e.target.value })
  }

  const addUser = () => {
    if(password!==password2){
      alert('Ooppps ! Your password doesn`t match')
    }else{

      userService.signUp({ username,email,password })
        .then(restUP => {
          if(restUP.username){
            setPop({
              showPopup: !pop.showPopup,
              text:'Register SUCCESS now you can Login'

            })
            setTimeout(() => {
              history.push('/userSignIn')
            }, 5000)
          }})
        .catch(error => { console.log(error)

          props.setCheckError(null)
          setPop({
            showPopup: !pop.showPopup,
            text:'Register Error'
          })
        })
    }
  }


  return(
    <div id='signUpForm' className="app flex-row align-items center">
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
                    <Input
                      type='text'
                      onChange={handleChange}
                      name='username'
                      value={username}
                      placeholder='User Name' ></Input>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Input
                      type='text'
                      name = 'email'
                      value = {email}
                      onChange={handleChange}
                      placeholder='email'></Input>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Input
                      type='password'
                      name = 'password'
                      value = {password}
                      onChange={handleChange}
                      placeholder='password'></Input>
                  </InputGroup>
                  <InputGroup className='mb-3'>
                    <Input
                      type='password'
                      name = 'password2'
                      value = {password2}
                      onChange={handleChange}
                      placeholder='confirm password'></Input>
                  </InputGroup>
                  <Button onClick={addUser} color='success' block>Create Account</Button>
                  {pop.showPopup ?
                    <ModelPopup
                      text={pop.text}
                    />
                    : null
                  }
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