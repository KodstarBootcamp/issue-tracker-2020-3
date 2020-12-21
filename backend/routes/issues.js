const router = require('express').Router()
let Issue = require('../models/issue.model')

router.route('/').get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/create').post((req, res) => {
  const title = req.body.title
  const description = req.body.description
  const labels = req.body.labels

  const newIssue = new Issue({
    title,
    description,
    labels
  })

  newIssue.save()
    .then(() => res.json('Successful Operation!'))
    .catch(err => res.status(400).json('Invalid input, object invalid: ' + err))
})

module.exports = router


