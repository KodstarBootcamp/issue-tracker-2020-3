const supertest = require('supertest')
const {
  testLabels, labelsInDb, nonExistingLabelId,
  existingUser, title1, title2
} = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const bcrypt = require('bcrypt')
const Label = require('../models/label.model')
const User = require('../models/user.model')
const State = require('../models/state.model')
const Issue = require('../models/issue.model')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

beforeAll(async () => {
  await State.deleteMany({})
  await Label.deleteMany({})
  await User.deleteMany({})
  await Issue.deleteMany({})
  const passwordHash = await bcrypt.hash(existingUser.password, 10)
  const user = new User({ username: existingUser.username, passwordHash: passwordHash, email:'asd' })
  await user.save()
  global.__tokenForAuth__ = jwt.sign({ username:user.username, id:user._id }, config.SECRET)
})

beforeEach(async () => {
  await Label.deleteMany({})
  const labelObjects = testLabels.map(el => new Label(el))
  const promiseArray = labelObjects.map(el => el.save())
  await Promise.all(promiseArray)
})

describe(title1('When there is initially some labels saved'), () => {
  describe(title2(1, 'GET-/label/all'), () => {
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

  describe(title2(0, 'POST-/label', '- adding of a new label'), () => {
    test('succeeds with valid data with status 201, json aplication', async () => {
      const initialLabels = await labelsInDb()
      const newLabels = {
        text: 'A text',
        color: '#606060'
      }
      await api
        .post('/label')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(newLabels)
        .expect(201)
        .expect('Content-Type', /application\/json/)
      const labelsAtEnd = await labelsInDb()
      expect(labelsAtEnd.length).toBe(initialLabels.length + 1)
      const contents = labelsAtEnd.map(n => n.text)
      expect(contents).toContain(
        'A text'
      )
    })
    test('fails if data invalid, with status code 400, error:Validation exception', async () => {
      const newLabel = {
        imp: true
      }
      const errorMessage = await api
        .post('/label')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(newLabel)
        .expect(400)
      const labelsAtEnd = await labelsInDb()
      expect(errorMessage.body.error).toBe('Validation exception')
      expect(labelsAtEnd.length).toBe(testLabels.length)
    })
    test('fails if token invalid, with status code 401, error:Invalid token', async () => {
      const newLabel = {
        text: 'A text',
        color: '#606060'
      }
      const errorMessage = await api
        .post('/label')
        .set('Authorization', 'bearer asd')
        .send(newLabel)
        .expect(401)
      const labelsAtEnd = await labelsInDb()
      expect(errorMessage.body.error).toBe('Invalid token')
      expect(labelsAtEnd.length).toBe(testLabels.length)
    })
    test('fails when label already exist, with status code 409, error:Label already exist', async () => {
      const labelsAtStart = await labelsInDb()
      const labelToAdd = labelsAtStart[0]
      const res = await api
        .post('/label')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(labelToAdd)
        .expect(409)
      expect(res.body.error).toContain('Label already exist. Dup value:')
    })
  })

  describe(title2(0, 'PUT-/label/:id', '- updating a label'), () => {
    test('succeeds to update with a valid id with status 200, application json', async () => {
      const labelsAtStart = await labelsInDb()
      const labelToUpdate = labelsAtStart[0]
      const newText = 'new Text jfhıfjhbkfdvjknl'
      labelToUpdate.text = newText
      const resultLabel = await api
        .put(`/label/${labelToUpdate.id}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(labelToUpdate)
        .expect(200)
        .expect('Content-Type', /application\/json/)
      expect(JSON.parse(JSON.stringify(resultLabel.body)).text)
        .toEqual(JSON.parse(JSON.stringify(labelToUpdate)).text)
    })
    test('fails if id is invalid, with statuscode 400, error:Invalid ID supplied', async () => {
      const invalidId = '5a3da82a3445'
      const res = await api
        .put(`/label/:${invalidId}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .expect(400)
      expect(res.body.error).toBe('Invalid ID supplied')
    })
    test('fails if token invalid, with status code 401, error:Invalid token', async () => {
      const id = (await labelsInDb())[0].id
      const newLabel = {
        text: 'A text',
        color: '#606060'
      }
      const errorMessage = await api
        .put('/label/' + id)
        .set('Authorization', 'bearer asd')
        .send(newLabel)
        .expect(401)
      expect(errorMessage.body.error).toBe('Invalid token')
    })
    test('fails if label does not exist, with statuscode 404, error:Label not found', async () => {
      const validNonexistingId = await nonExistingLabelId()
      const res = await api
        .put(`/label/${validNonexistingId}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .expect(404)
      expect(res.body.error).toBe('label not found')
    })
    test('fails if sent invalid data, with statuscode 400, error:Validation exception', async () => {
      const labelsAtStart = await labelsInDb()
      const labelToUpdate = labelsAtStart[0]
      const res = await api
        .put(`/label/${labelToUpdate.id}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send({ 'asd':'value' })
        .expect(400)
      expect(res.body.error).toBe('Validation exception')
    })
  })

  describe(title2(0, 'DELETE-/label/:id', '- deletion of a label'), () => {
    test('succeeds to delete if id is valid with status code 200', async () => {
      const labelsAtStart = await labelsInDb()
      const labelToDelete = labelsAtStart[0]
      await api
        .delete(`/label/${labelToDelete.id}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .expect(200)
      const labelsAtEnd = await labelsInDb()
      expect(labelsAtEnd.length).toBe(
        labelsAtStart.length - 1
      )
      const texts = labelsAtEnd.map(r => r.text)
      expect(texts).not.toContain(labelToDelete.text)
    })
    test('fails when invalid id, with status 400, error:Invalid ID supplied', async () => {
      const res = await api
        .delete('/label/fd..u54')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .expect(400)
      expect(res.body.error).toBe('Invalid ID supplied')
    })
    test('fails if token invalid, with status code 401, error:Invalid token', async () => {
      const id = (await labelsInDb())[0].id
      const errorMessage = await api
        .delete('/label/' + id)
        .set('Authorization', 'bearer asd')
        .expect(401)
      expect(errorMessage.body.error).toBe('Invalid token')
    })
    test('fails with statuscode 404 if label does not exist', async () => {
      const validNonexistingId = await nonExistingLabelId()
      const res = await api
        .delete(`/label/${validNonexistingId}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .expect(404)
      expect(res.body.error).toBe('label not found')
    })
  })
})
