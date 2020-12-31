const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
// const config = require('../utils/config')
const app = require('../server')
const api = supertest(app)

const Issue = require('../models/issue.model')

beforeEach(async () => {
  await Issue.deleteMany({})

  const issueObjects = helper.testIssues
    .map(el => new Issue(el))
  const promiseArray = issueObjects.map(el => el.save())
  await Promise.all(promiseArray)

  //console.log(promiseArray)
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

    const contents = response.body.map(r => r.description)
    expect(contents).toContain(
      'Browser can execute only Javascript'
    )
  })

  describe('viewing a specific issue', () => {

    test('succeeds with a valid id', async () => {
      const issuesAtStart = await helper.issuesInDb()
      const issueToView = issuesAtStart[0]
      const resultIssue = await api
        .get(`/issue/${issueToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(JSON.stringify(resultIssue.body)).toEqual(JSON.stringify(issueToView))
    })

    test('fails with statuscode 404 if issue does not exist', async () => {
      const validNonexistingId = await helper.nonExistingId()
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
      const initialIssues = await helper.issuesInDb()
      const newIssue = {
        title: 'A title',
        description: 'async/await simplifies making async calls',
        labels: []
      }
      await api
        .post('/issue')
        .send(newIssue)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const issuesAtEnd = await helper.issuesInDb()
      expect(issuesAtEnd.length).toBe(initialIssues.length + 1)

      const contents = issuesAtEnd.map(n => n.description)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })

    test('fails with status code 405 if data invalid', async () => {
      const newIssue = {
        important: true
      }

      await api
        .post('/issue')
        .send(newIssue)
        .expect(405)

      const issuesAtEnd = await helper.issuesInDb()

      expect(issuesAtEnd.length).toBe(helper.testIssues.length)
    })
  })

  describe('deletion of a issue', () => {
    test('succeeds with status code 200 if id is valid', async () => {
      const issuesAtStart = await helper.issuesInDb()
      const issueToDelete = issuesAtStart[0]

      await api
        .delete(`/issue/${issueToDelete.id}`)
        .expect(200)

      const issuesAtEnd = await helper.issuesInDb()

      expect(issuesAtEnd.length).toBe(
        issuesAtStart.length - 1
      )

      const titles = issuesAtEnd.map(r => r.title)

      expect(titles).not.toContain(issueToDelete.title)
    })
  })

})

afterAll(() => {
  mongoose.connection.close()
})
