const supertest = require('supertest')
const {
  existingUser, usersInDb, testUser,
  title1, title2
} = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const User = require('../models/user.model')
const State = require('../models/state.model')
const Label = require('../models/label.model')
const Issue = require('../models/issue.model')
const bcrypt = require('bcrypt')

beforeAll(async () => {
  await State.deleteMany({})
  await Label.deleteMany({})
  await Issue.deleteMany({})
})

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(existingUser.password, 10)
  const user = new User({ username: existingUser.username, passwordHash: passwordHash, email:'dsa' })
  await user.save()
})

describe(title1('When there is initially some users saved'), () => {
  describe(title2('POST-/users', '- adding of a new user'), () => {
    test('creation succeeds for a new username', async () => {

      const initialUsers = await usersInDb()
      const newUser = {
        username: 'celiltat',
        password: 'celiltat',
        email: 'celiltat@gmail.com'
      }
      await api
        .post('/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const usersAtEnd = await usersInDb()
      expect(usersAtEnd).toHaveLength(initialUsers.length + 1)
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(testUser.username)
    })

    test('fails if there is no username', async () => {
      const newUser = {
        password: 'celiltat',
        email:    'celiltat@gmail.com'
      }
      const errorMessage = await api
        .post('/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      await usersInDb()
      expect(errorMessage.body.error).toContain('password or username missing')
    })

    test('fails if there is no password', async () => {
      const newUser = {
        username: 'celiltat',
        email:    'celiltat@gmail.com'
      }
      const errorMessage = await api
        .post('/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      await usersInDb()
      expect(errorMessage.body.error).toContain('password or username missing')
    })

    test('fails if password invalid', async () => {
      const newUser = {
        username: 'celiltat',
        password: 'ce',
        email:    'celiltat@gmail.com'
      }
      const errorMessage = await api
        .post('/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)
      await usersInDb()
      expect(errorMessage.body.error).toContain('password should be at 3 characters long')
    })
  })
})
