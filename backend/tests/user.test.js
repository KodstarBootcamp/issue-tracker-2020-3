const supertest = require('supertest')
const { existingUser, usersInDb, testUser } = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash(existingUser.password, 10)
  const user = new User({ username: existingUser.username, passwordHash: passwordHash, email:'dsa' })
  await user.save()
})

describe('When there is initially some users saved', () => {

  describe('|: POST-/users :| - adding of a new user', () => {
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
        .expect(200)
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
        .expect(401)
        .expect('Content-Type', 'text/html; charset=utf-8')

      await usersInDb()
      expect(errorMessage.text).toContain('password or username missing')

    })

    test('fails if there is no password', async () => {
      const newUser = {
        username: 'celiltat',
        email:    'celiltat@gmail.com'
      }
      const errorMessage = await api
        .post('/users')
        .send(newUser)
        .expect(401)
        .expect('Content-Type', 'text/html; charset=utf-8')

      await usersInDb()
      expect(errorMessage.text).toContain('password or username missing')

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
        .expect(402)
        .expect('Content-Type','text/html; charset=utf-8')

      await usersInDb()
      expect(errorMessage.text).toContain('password should be at 3 characters long')

    })

  })
})
