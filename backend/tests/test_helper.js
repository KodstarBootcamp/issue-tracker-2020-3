const Issue = require('../models/issue.model')

const testIssues = [
  {
    'title': 'An issue title',
    'description': 'A lengthy description',
    'labels': []
  },
  {
    'title': '1title',
    'description': 'Browser can execute only Javascript',
    'labels': []
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
