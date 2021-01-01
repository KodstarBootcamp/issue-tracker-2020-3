const Issue = require('../models/issue.model')
const Label = require('../models/label.model')

const testIssues = [
  {
    'title': 'An issue title',
    'description': 'A lengthy description',
    'labels': []
  },
  {
    'title': 'Another title',
    'description': 'Browser can execute only Javascript',
    'labels': []
  }
]

const testLabels = [
  {
    'text':'backend',
    'color':'#101010'
  },
  {
    'text':'frontend-1',
    'color':'#202020'
  },
  {
    'text':'frontend-2',
    'color':'#303030'
  },
  {
    'text':'mobile',
    'color':'#404040'
  },
  {
    'text':'test',
    'color':'#505050'
  }
]
const issuesInDb = async () => {
  const issues = await Issue.find({})
  return issues.map(issue => issue.toJSON())
}

const nonExistingIssueId = async () => {
  const issue = new Issue({ title: 'willremovethissoon', description: 'des' })
  await issue.save()
  await issue.remove()
  return issue._id.toString()
}

const labelsInDb = async () => {
  const labels = await Label.find({})
  return labels.map(label => label.toJSON())
}

const nonExistingLabelId = async () => {
  const label = new Label({ text:'asd' })
  await label.save()
  await label.remove()
  return label._id.toString()
}

module.exports = {
  testLabels,
  testIssues,
  issuesInDb,
  nonExistingIssueId,
  labelsInDb,
  nonExistingLabelId
}
