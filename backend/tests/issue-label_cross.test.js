const supertest = require('supertest')
const {
  anIssueInstanceFull, labelsInDb, title2,
  issuesInDb, existingUser, title1,
} = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const Issue = require('../models/issue.model')
const Label = require('../models/label.model')
const bcrypt = require('bcrypt')
const User = require('../models/user.model')
const State = require('../models/State.model')
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
  await Issue.deleteMany({})
})

describe(title1('when db is empty'), () => {
  describe(title2(1, 'POST-/issue'), () => {
    test('when new Issue added also new Labels added, and populated', async () => {
      const newIssue = anIssueInstanceFull
      const res = await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(newIssue)
      if (res.body.labels.length) {
        res.body.labels.forEach(l => delete l.id)
      }
      expect(res.body.labels).toEqual(expect.arrayContaining(newIssue.labels))
      const labels = await labelsInDb()
      expect(labels.length).toBe(newIssue.labels.length)
    })
    test('(a label have added)when new Issue added, new label added,'
      + ' old one doesn\'t duplicate, it\'ll update', async () => {
      const newIssue = anIssueInstanceFull
      await new Label({ ...newIssue.labels[0] }).save()
      newIssue.labels[0].color = '$$$$'
      const resIssue  = await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(newIssue)
      const labels = await labelsInDb()
      expect(resIssue.body.labels).toEqual(expect.arrayContaining(labels))
      expect(resIssue.body.labels.map(l => l.color)).toContain(newIssue.labels[0].color)
    })
  })
})

describe(title1('When a issue added with labels'), () => {
  describe(title2( 1, 'PUT-/issue/:id'), () => {
    test('when update an issue, new labels added, labels that removed from the label list are'
      + ' not delete permanently, populated', async () => {
      const initialIssue = await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(anIssueInstanceFull)
      const newIssue = Object.assign({}, anIssueInstanceFull)
      const oldLabel = newIssue.labels[1]
      newIssue.labels = [newIssue.labels[0], { text:'new label' }]
      const resIssue = await api
        .put(`/issue/${initialIssue.body.id}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(newIssue)
      const labels = await labelsInDb()
      const removedLabelFromList = await Label.findOne({ text:oldLabel.text })
      const newLabelInList = await Label.findOne({ text:'new label' })
      expect(labels.length).toBe(initialIssue.body.labels.length + 1)
      expect(removedLabelFromList).toBeTruthy()
      expect(newLabelInList).toBeTruthy()
      expect(resIssue.body.labels.map(l => l.text)).toContain('new label')
      expect(resIssue.body.labels.map(l => l.text)).not.toContain(oldLabel.text)
    })
    test('when update an issue, if needed the label\'ll update', async () => {
      const initialIssue = await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(anIssueInstanceFull)
      const newIssue = Object.assign({}, anIssueInstanceFull)
      newIssue.labels = [{ ...newIssue.labels[0], color:'$$$$' }]
      const resIssue = await api
        .put(`/issue/${initialIssue.body.id}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(newIssue)
      const labels = await labelsInDb()
      expect(labels.length).toBe(initialIssue.body.labels.length)
      expect(resIssue.body.labels.map(l => l.color)).toContain('$$$$')
    })
  })

  describe(title2(0, 'DELETE-/issue/:id'), () => {
    test('when delete a issue Labels are still exist', async () => {
      const initialIssue = await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(anIssueInstanceFull)
      await api
        .delete(`/issue/${initialIssue.body.id}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
      const labels = await labelsInDb()
      const issues = await issuesInDb()
      expect(labels.length).toBe(2)
      expect(issues.length).toBe(0)
    })
  })

  describe(title2(0, 'DELETE-/label/:id'), () => {
    test('when delete a label, the label are removed from all issues', async () => {
      await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send(anIssueInstanceFull)
      await api
        .post('/issue')
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
        .send({ ...anIssueInstanceFull, title:'other title' })
      const labelToDel = await Label.findOne({ text:'text2' })
      expect(labelToDel).toBeTruthy()
      await api
        .delete(`/label/${labelToDel._id.toString()}`)
        .set('Authorization', `bearer ${global.__tokenForAuth__}`)
      const labels = await labelsInDb()
      const issues = await issuesInDb()
      expect(issues.map(l => l.text)).not.toContain('text2')
      expect(labels.length).toBe(1)
    })
  })
})
