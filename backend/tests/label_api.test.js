const supertest = require('supertest')
const mongoose = require('mongoose')
const { replSet } = require('../mongodb')
const { testLabels, labelsInDb, nonExistingLabelId } = require('./test_helper')
const app = require('../server')
const api = supertest(app)

const Label = require('../models/label.model')

beforeEach(async () => {
  await Label.deleteMany({})
  const labelObjects = testLabels.map(el => new Label(el))
  const promiseArray = labelObjects.map(el => el.save())
  await Promise.all(promiseArray)
  //console.log(promiseArray)
})

describe('When there is initially some labels saved', () => {
  describe('|: GET-/label/all :|', () => {
    test('labels are returned as json with status 200', async () => {
      await api
        .get('/label/all')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })
    test('all labels are returned', async () => {
      const response = await api.get('/label/all')
      expect(response.body.length).toBe(testLabels.length)
    })
    test('a specific label is within the returned labels', async () => {
      const response = await api.get('/label/all')
      const contents = response.body.map(r => r.text)
      expect(contents).toContain(
        'frontend-2'
      )
    })
  })

  describe('|: POST-/label :| - adding of a new label', () => {
    test('succeeds with valid data with status 201, json aplication', async () => {
      const initialLabels = await labelsInDb()
      const newLabels = {
        text: 'A text',
        color: '#606060'
      }
      await api
        .post('/label')
        .send(newLabels)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const labelsAtEnd = await labelsInDb()
      expect(labelsAtEnd.length).toBe(initialLabels.length + 1)

      const contents = labelsAtEnd.map(n => n.text)
      expect(contents).toContain(
        'A text'
      )
    })
  })
  //   test('fails if data invalid, with status code 400, error:Validation exception', async () => {
  //     const newIssue = {
  //       imp: true
  //     }

  //     const errorMessage = await api
  //       .post('/issue')
  //       .send(newIssue)
  //       .expect(400)

  //     const issuesAtEnd = await helper.issuesInDb()
  //     expect(errorMessage.text).toBe('Validation exception')
  //     expect(issuesAtEnd.length).toBe(helper.testIssues.length)
  //   })

  //   test('fails when issue already exist, with status code 409, error:Issue already exist', async () => {
  //     const issuesAtStart = await helper.issuesInDb()
  //     const issueToAdd = issuesAtStart[0]

  //     const res = await api
  //       .post('/issue')
  //       .send(issueToAdd)
  //       .expect(409)
  //     expect(res.text).toBe('Issue already exist')
  //   })
  // })

  // describe('|: PUT-/issue/:id :| - updating a issue', () => {
  //   test('succeeds to update with a valid id with status 200, application json', async () => {
  //     const issuesAtStart = await helper.issuesInDb()
  //     const issueToUpdate = issuesAtStart[0]
  //     const newTitle = 'new Title jfhıfjhbkfdvjknl'
  //     issueToUpdate.title = newTitle
  //     const resultIssue = await api
  //       .put(`/issue/${issueToUpdate.id}`)
  //       .send(issueToUpdate)
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)
  //     expect(JSON.parse(JSON.stringify(resultIssue.body)).title)
  //       .toEqual(JSON.parse(JSON.stringify(issueToUpdate)).title)
  //   })

  //   test('fails if id is invalid, with statuscode 400, error:Invalid ID supplied', async () => {
  //     const invalidId = '5a3da82a3445'
  //     const res = await api
  //       .put(`/issue/:${invalidId}`)
  //       .expect(400)
  //     expect(res.text).toBe('Invalid ID supplied')
  //   })

  //   test('fails if issue does not exist, with statuscode 404, error:Issue not found', async () => {
  //     const validNonexistingId = await helper.nonExistingId()
  //     const res = await api
  //       .put(`/issue/${validNonexistingId}`)
  //       .expect(404)
  //     expect(res.text).toBe('Issue not found')
  //   })

  //   test('fails if issue does not exist, with statuscode 405, error:Validation exception', async () => {
  //     const issuesAtStart = await helper.issuesInDb()
  //     const issueToUpdate = issuesAtStart[0]
  //     const res = await api
  //       .put(`/issue/${issueToUpdate.id}`)
  //       .send({ 'asd':'value' })
  //       .expect(405)
  //     expect(res.text).toBe('Validation exception')
  //   })
  // })

  // describe('|: DELETE-/issue/:id :| - deletion of a issue', () => {
  //   test('succeeds to delete with status code 200 if id is valid', async () => {
  //     const issuesAtStart = await helper.issuesInDb()
  //     const issueToDelete = issuesAtStart[0]
  //     await api
  //       .delete(`/issue/${issueToDelete.id}`)
  //       .expect(200)
  //     const issuesAtEnd = await helper.issuesInDb()
  //     expect(issuesAtEnd.length).toBe(
  //       issuesAtStart.length - 1
  //     )
  //     const titles = issuesAtEnd.map(r => r.title)
  //     expect(titles).not.toContain(issueToDelete.title)
  //   })

  //   test('fails when invalid id, with status 400, error:Invalid ID supplied', async () => {
  //     const res = await api
  //       .delete('/issue/fd..u54')
  //       .expect(400)
  //     expect(res.text).toBe('Invalid ID supplied')
  //   })

  //   test('fails with statuscode 404 if issue does not exist', async () => {
  //     const validNonexistingId = await helper.nonExistingId()
  //     await api
  //       .get(`/issue/${validNonexistingId}`)
  //       .expect(404)
  //   })
  // })

  // describe('|: GET-/issue/paginate/:start-end :| when req with paginate', () => {
  //   beforeEach(async () => {
  //     await Issue.deleteMany({})
  //     const title = 'An issue title-'
  //     const template = {
  //       'title': null,
  //       'description': 'A lengthy description',
  //       'labels': []
  //     }
  //     for (let i = 0; i < 20; i++){
  //       template.title = title + i
  //       await new Issue(template).save()
  //     }
  //   })
  //   test('succeeds request with only end value(/issue/paginate/10),start/end checked, status 200, json', async () => {
  //     const response = await api
  //       .get('/issue/paginate/10')
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)
  //     expect(response.body.length).toBe(10)
  //     expect(response.body[0].title).toBe('An issue title-0')
  //     expect(response.body.pop().title).toBe('An issue title-9')
  //   })
  //   test('succeeds with start and end value, start/end checked, status 200, json', async () => {
  //     const response = await api
  //       .get('/issue/paginate/5-14')
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)
  //     expect(response.body.length).toBe(9)
  //     expect(response.body[0].title).toBe('An issue title-5')
  //     expect(response.body.pop().title).toBe('An issue title-13')
  //   })
  //   test.only('succeeds if end value exceed the last index, start/end checked, status 200, json', async () => {
  //     const response = await api
  //       .get('/issue/paginate/15-35')
  //       .expect(200)
  //       .expect('Content-Type', /application\/json/)
  //     expect(response.body.length).toBe(5)
  //     expect(response.body[0].title).toBe('An issue title-15')
  //     expect(response.body.pop().title).toBe('An issue title-19')
  //   })
  // })
})

afterAll(() => {
  mongoose.connection.close()
  replSet.stop()
})
