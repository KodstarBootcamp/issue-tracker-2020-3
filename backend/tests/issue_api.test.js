const supertest = require('supertest')
const mongoose = require('mongoose')
const { replSet } = require('../mongodb')
const { nonExistingIssueId, issuesInDb, testIssues } = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const Issue = require('../models/issue.model')

beforeEach(async () => {
  await Issue.deleteMany({})
  const issueObjects = testIssues.map(el => new Issue(el))
  const promiseArray = issueObjects.map(el => el.save())
  await Promise.all(promiseArray)
  //console.log(promiseArray)
})

describe('When there is initially some issues saved', () => {
  describe('|: GET-/issue/all :|', () => {
    test('issues are returned as json with status 200', async () => {
      await api
        .get('/issue/all')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all issues are returned', async () => {
      const response = await api.get('/issue/all')
      expect(response.body.length).toBe(testIssues.length)
    })
    test('a specific issue is within the returned issues', async () => {
      const response = await api.get('/issue/all')
      const contents = response.body.map(r => r.description)
      expect(contents).toContain(
        'Browser can execute only Javascript'
      )
    })
  })

  describe('|: GET-/issue/:id :| - viewing a specific issue', () => {
    test('succeeds with a valid id with status 200, application json', async () => {
      const issuesAtStart = await issuesInDb()
      const issueToView = issuesAtStart[0]
      const resultIssue = await api
        .get(`/issue/${issueToView.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(JSON.stringify(resultIssue.body)).toEqual(JSON.stringify(issueToView))
    })
    test('fails with statuscode 400 id is invalid', async () => {
      const invalidId = '5a3da82a3445'
      const res = await api
        .get(`/issue/:${invalidId}`)
        .expect(400)
      expect(res.text).toBe('Invalid ID supplied')
    })
    test('fails with statuscode 404 if issue does not exist', async () => {
      const validNonexistingId = await nonExistingIssueId()
      const res = await api
        .get(`/issue/${validNonexistingId}`)
        .expect(404)
      expect(res.text).toBe('Issue not found')
    })
  })

  describe('|: POST-/issue :| - adding of a new issue', () => {
    test('succeeds with valid data with status 201, json aplication', async () => {
      const initialIssues = await issuesInDb()
      const newIssue = {
        title: 'A title',
        description: 'async/await simplifies making async calls',
        labels: []
      }
      await api
        .post('/issue')
        .send(newIssue)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const issuesAtEnd = await issuesInDb()
      expect(issuesAtEnd.length).toBe(initialIssues.length + 1)
      const contents = issuesAtEnd.map(n => n.description)
      expect(contents).toContain(
        'async/await simplifies making async calls'
      )
    })
    test('fails if data invalid, with status code 400, error:Validation exception', async () => {
      const newIssue = {
        imp: true
      }
      const errorMessage = await api
        .post('/issue')
        .send(newIssue)
        .expect(400)
      const issuesAtEnd = await issuesInDb()
      expect(errorMessage.text).toBe('Validation exception')
      expect(issuesAtEnd.length).toBe(testIssues.length)
    })
    test('fails when issue already exist, with status code 409, error:Issue already exist', async () => {
      const issuesAtStart = await issuesInDb()
      const issueToAdd = issuesAtStart[0]
      const res = await api
        .post('/issue')
        .send(issueToAdd)
        .expect(409)
      expect(res.text).toBe('Issue already exist')
    })
  })

  describe('|: PUT-/issue/:id :| - updating a issue', () => {
    test('succeeds to update with a valid id with status 200, application json', async () => {
      const issuesAtStart = await issuesInDb()
      const issueToUpdate = issuesAtStart[0]
      const newTitle = 'new Title jfhıfjhbkfdvjknl'
      issueToUpdate.title = newTitle
      const resultIssue = await api
        .put(`/issue/${issueToUpdate.id}`)
        .send(issueToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(JSON.parse(JSON.stringify(resultIssue.body)).title)
        .toEqual(JSON.parse(JSON.stringify(issueToUpdate)).title)
    })
    test('fails if id is invalid, with statuscode 400, error:Invalid ID supplied', async () => {
      const invalidId = '5a3da82a3445'
      const res = await api
        .put(`/issue/:${invalidId}`)
        .expect(400)
      expect(res.text).toBe('Invalid ID supplied')
    })
    test('fails if issue does not exist, with statuscode 404, error:Issue not found', async () => {
      const validNonexistingId = await nonExistingIssueId()
      const res = await api
        .put(`/issue/${validNonexistingId}`)
        .expect(404)
      expect(res.text).toBe('Issue not found')
    })
    test('fails if sent unvalid data, with statuscode 405, error:Validation exception', async () => {
      const issuesAtStart = await issuesInDb()
      const issueToUpdate = issuesAtStart[0]
      const res = await api
        .put(`/issue/${issueToUpdate.id}`)
        .send({ 'asd':'value' })
        .expect(405)
      expect(res.text).toBe('Validation exception')
    })
  })

  describe('|: DELETE-/issue/:id :| - deletion of a issue', () => {
    test('succeeds to delete if id is valid with status code 200', async () => {
      const issuesAtStart = await issuesInDb()
      const issueToDelete = issuesAtStart[0]
      await api
        .delete(`/issue/${issueToDelete.id}`)
        .expect(200)
      const issuesAtEnd = await issuesInDb()
      expect(issuesAtEnd.length).toBe(
        issuesAtStart.length - 1
      )
      const titles = issuesAtEnd.map(r => r.title)
      expect(titles).not.toContain(issueToDelete.title)
    })
    test('fails when invalid id, with status 400, error:Invalid ID supplied', async () => {
      const res = await api
        .delete('/issue/fd..u54')
        .expect(400)
      expect(res.text).toBe('Invalid ID supplied')
    })
    test('fails with statuscode 404 if issue does not exist', async () => {
      const validNonexistingId = await nonExistingIssueId()
      await api
        .get(`/issue/${validNonexistingId}`)
        .expect(404)
    })
  })

  describe('|: GET-/issue/all?start={start}&end={end} :| when req with paginate', () => {
    beforeEach(async () => {
      await Issue.deleteMany({})
      const title = 'An issue title-'
      const template = {
        'title': null,
        'description': 'A lengthy description',
        'labels': []
      }
      for (let i = 0; i < 20; i++){
        template.title = title + i
        await new Issue(template).save()
      }
    })
    test('succeeds request with only count value(/issue/all?count=10),start/end checked, status 200, json', async () => {
      const response = await api
        .get('/issue/all?count=10')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(10)
      expect(response.body[0].title).toBe('An issue title-0')
      expect(response.body.pop().title).toBe('An issue title-9')
    })
    test('succeeds request with only start value,count default 10,start/end checked, status 200, json', async () => {
      const response = await api
        .get('/issue/all?start=3')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(10)
      expect(response.body[0].title).toBe('An issue title-3')
      expect(response.body.pop().title).toBe('An issue title-12')
    })
    test('succeeds with start and end value, start/end checked, status 200, json', async () => {
      const response = await api
        .get('/issue/all?start=5&count=9')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(9)
      expect(response.body[0].title).toBe('An issue title-5')
      expect(response.body.pop().title).toBe('An issue title-13')
    })
    test('succeeds if end value exceed the last index, start/end checked, status 200, json', async () => {
      const response = await api
        .get('/issue/all?start=5&count=50')
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(response.body.length).toBe(15)
      expect(response.body[0].title).toBe('An issue title-5')
      expect(response.body.pop().title).toBe('An issue title-19')
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
  replSet.stop()
})
