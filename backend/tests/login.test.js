const supertest = require('supertest')
const { testUser } = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(testUser.password, 10)
  const user = new User({ username: testUser.username, passwordHash: passwordHash })

  await user.save()
})

describe('When there is initially some users saved', () => {

  describe('|: POST-/login :| - log in system', () => {
    test('login succeeds with correct password', async () => {

      const credentials = {
        username: testUser.username,
        password: testUser.password
      }

      const response = await api
        .post('/login')
        .send(credentials)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.token).toBeDefined()
      expect(response.body.username).toBe(testUser.username)

    })

    test('login fails with wrong password', async () => {
      const credentials = {
        username: testUser.username,
        password: 'wrongpassword'
      }
      const response = await api
        .post('/login')
        .send(credentials)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe('invalid username or password')
    })

    test('login fails with wrong user', async () => {
      const credentials = {
        username: 'wronguser',
        password: 'wrongpassword'
      }
      const response = await api
        .post('/login')
        .send(credentials)
        .expect(401)
        .expect('Content-Type', /application\/json/)

      expect(response.body.error).toBe('invalid username or password')
    })

  })
})
