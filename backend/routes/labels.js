const router = require('express').Router()
let Label = require('../models/label.model')
let Issue = require('../models/issue.model')
require('express-async-errors')

router.route('/all').get((req, res) => {
  Label.find()
    .then(labels => res.json(labels))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete(async (req, res) => {
  const label = await Label.findById(req.params.id)
  if (!label) {
    return res.status(404).send('Label not found').end()
  }
  const relatedIssues = await Issue.find({
    labels: { $elemMatch: { $eq:req.params.id } }
  })
  relatedIssues.forEach( async (issue) => {
    issue.labels = issue.labels.filter( l => l.id !== req.params.id)
    await Issue.findByIdAndUpdate(issue._id, issue)
  })
  await Label.findByIdAndRemove(req.params.id)
  return res.status(200).send('successfull operation')
})


module.exports = router
