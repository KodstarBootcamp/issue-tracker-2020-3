const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const config = require('../utils/config')
const app = require('../server')
const api = supertest(app)

const Issue = require('../models/issue.model')

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

beforeEach(async () => {
  await Issue.deleteMany({})

  const issueObjects = helper.testIssues
    .map(el => new Issue(el))
  const promiseArray = issueObjects.map(el => el.save())
  await Promise.all(promiseArray)

  console.log(promiseArray)
})

describe('when there is initially some issues saved', () => {

  test('issues are returned as json', async () => {
    await api
      .get('/issue/all')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all issues are returned', async () => {
    const response = await api.get('/issue/all')
    expect(response.body.length).toBe(helper.testIssues.length)
  })

  test('a specific note is within the returned notes', async () => {
    const response = await api.get('/issue/all')

    const contents = response.body.map(r => r.content)
    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })

  /* describe('viewing a specific issue', () => {

    test('succeeds with a valid id', async () => {
      const issuesAtStart = await helper.issuesInDb()

      const issueToView = issuesAtStart[0]

      const resultIssue = await api
        .get(`/issue/all/${issueToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(resultIssue.body).toEqual(issueToView)
    })

    test('fails with statuscode 404 if issue does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()

      console.log(validNonexistingId)

      await api
        .get(`/issue/all/${validNonexistingId}`)
        .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3d5da59070081a82a3445'

      await api
        .get(`/issue/:${invalidId}`)
        .expect(400)
    })
  })

  describe('addition of a new issue', () => {
    test('succeeds with valid data', async () => {
      const newIssue = {
        content: 'async/await simplifies making async calls',
        important: true,
      }

      await api
        .post('/issue/all')
        .send(newIssue)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const issuesAtEnd = await helper.issuesInDb()
      expect(issuesAtEnd.length).toBe(helper.initialIssues.length + 1)

      const contents = issuesAtEnd.map(n => n.content)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })

    test('fails with status code 400 if data invalid', async () => {
      const newIssue = {
        important: true
      }

      await api
        .post('/issue/all')
        .send(newIssue)
        .expect(400)

      const issuesAtEnd = await helper.issuesInDb()

      expect(issuesAtEnd.length).toBe(helper.testIssues.length)
    })
  })

  describe('deletion of a issue', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const issuesAtStart = await helper.issuesInDb()
      const issueToDelete = issuesAtStart(0)

      await api
        .delete(`/issue/all/${issueToDelete.id}`)
        .expect(204)

      const issuesAtEnd = await helper.issuesInDb()

      expect(issuesAtEnd.length).toBe(
        helper.testIssues.length - 1
      )

      const contents = issuesAtEnd.map(r => r.content)

      expect(contents).not.toContain(issueToDelete.content)
    })
  })
*/
})

afterAll(() => {
  mongoose.connection.close()
})
