const supertest = require('supertest')
// const mongoose = require('mongoose')
// const { replSet } = require('../mongodb')
const { anIssueInstanceFull, labelsInDb, issuesInDb } = require('./test_helper')
const app = require('../server')
const api = supertest(app)
const Issue = require('../models/issue.model')
const Label = require('../models/label.model')

beforeEach(async () => {
  await Label.deleteMany({})
  await Issue.deleteMany({})
})

describe('when db is empty', () => {
  describe('|: POST-/issue :|', () => {
    test('when new Issue added also new Labels added, and populated', async () => {
      const newIssue = anIssueInstanceFull
      const res = await api.post('/issue').send(newIssue)
      if (res.body.labels.length) {
        res.body.labels.forEach(l => delete l.id)
      }
      expect(res.body.labels).toEqual(expect.arrayContaining(newIssue.labels))
      const labels = await labelsInDb()
      expect(labels.length).toBe(newIssue.labels.length)
    })
    test('(a label have added)when new Issue added, new label added, old one doesn\'t'
      + ' duplicate, if necessesary it\'ll update', async () => {
      const newIssue = anIssueInstanceFull
      await new Label({ ...newIssue.labels[0] }).save()
      newIssue.labels[0].color = '$$$$'
      const resIssue  = await api.post('/issue').send(newIssue)
      const labels = await labelsInDb()
      expect(resIssue.body.labels).toEqual(expect.arrayContaining(labels))
      expect(resIssue.body.labels.map(l => l.color)).toContain(newIssue.labels[0].color)
    })
  })
})

describe('When a issue added with labels', () => {
  describe('|: PUT-/issue/:id :|', () => {
    test('when update an issue, new labels added, labels that removed from the label list are'
      + ' not delete permanently, populated', async () => {
      const initialIssue = await api.post('/issue').send(anIssueInstanceFull)
      const newIssue = Object.assign({}, anIssueInstanceFull)
      const oldLabel = newIssue.labels[1]
      newIssue.labels = [newIssue.labels[0], { text:'new label' }]
      const resIssue = await api.put(`/issue/${initialIssue.body.id}`).send(newIssue)
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
      const initialIssue = await api.post('/issue').send(anIssueInstanceFull)
      const newIssue = Object.assign({}, anIssueInstanceFull)
      newIssue.labels = [{ ...newIssue.labels[0], color:'$$$$' }]
      const resIssue = await api.put(`/issue/${initialIssue.body.id}`).send(newIssue)
      const labels = await labelsInDb()
      expect(labels.length).toBe(initialIssue.body.labels.length)
      expect(resIssue.body.labels.map(l => l.color)).toContain('$$$$')
    })
  })

  describe('|: DELETE-/issue/:id :|', () => {
    test('when delete a issue Labels are still exist', async () => {
      const initialIssue = await api.post('/issue').send(anIssueInstanceFull)
      await api.delete(`/issue/${initialIssue.body.id}`)
      const labels = await labelsInDb()
      const issues = await issuesInDb()
      expect(labels.length).toBe(2)
      expect(issues.length).toBe(0)
    })
  })

  describe('|: DELETE-/label/:id :|', () => {
    test('when delete a label, the label are removed from all issues', async () => {
      await api.post('/issue').send(anIssueInstanceFull)
      await api.post('/issue').send({ ...anIssueInstanceFull, title:'other title' })
      const labelToDel = await Label.findOne({ text:'text2' })
      expect(labelToDel).toBeTruthy()
      await api.delete(`/label/${labelToDel._id.toString()}`)
      const labels = await labelsInDb()
      const issues = await issuesInDb()
      expect(issues.map(l => l.text)).not.toContain('text2')
      expect(labels.length).toBe(1)
    })
  })
})

// afterAll(async () => {
//   mongoose.connection.close()
//   await replSet.stop()
// })
