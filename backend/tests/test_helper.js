const Issue = require('../models/issue.model')

const testIssues = [
  {
    'title': 'An issue title',
    'description': 'A lengthy description',
    'labels': [
      {
        'text': 'todo',
        'color': '#fff'
      },
      {
        'text': 'story',
        'color': '#000',
        'id': '5f..ba5'
      }
    ]
  },
  {
    'title': '1title',
    'description': '1description',
    'labels': [
      {
        'text': '1do',
        'color': '#fff'
      },
      {
        'text': '1ry',
        'color': '#000',
        'id': '5f..ba5'
      }
    ]
  }
]
const issuesInDb = async () => {
  const issues = await Issue.find({})
  return issues.map(issue => issue.toJSON())
}

const nonExistingId = async () => {
  const issue = new Issue({ content: 'willremovethissoon' })
  await issue.save()
  await issue.remove()

  return issue._id.toString()
}

module.exports = {
  testIssues, issuesInDb, nonExistingId
}
