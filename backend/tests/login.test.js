const supertest = require('supertest')
const { testUser, title1, title2 } = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const Label = require('../models/label.model')
const User = require('../models/user.model')
const State = require('../models/state.model')
const Issue = require('../models/issue.model')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  await State.deleteMany({})
  await Label.deleteMany({})
  await User.deleteMany({})
  await Issue.deleteMany({})
  const passwordHash = await bcrypt.hash(testUser.password, 10)
  const user = new User({ username: testUser.username, passwordHash: passwordHash, email:'dsa' })
  await user.save()
})

describe(title1('When there is initially some users saved'), () => {
  describe(title2(1, 'POST-/login', '- log in system'), () => {
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
      expect(response.body.user.username).toBe(testUser.username)
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
