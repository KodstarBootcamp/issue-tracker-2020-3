const router = require('express').Router()
const Issue = require('../models/issue.model')
require('express-async-errors')
const objCleaner = require('../utils/objUtils').objCleaner

router.route('/').post(async (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const labels = req.body.labels
  const check = await Issue.findOne({ title:req.body.title })
  if (check){
    return res.status(409).send('Issue already exist').end()
  }
  const newIssue = new Issue({
    title,
    description,
    labels
  })
  const savedIssue = await newIssue.save()
  return res.status(200).json(savedIssue)
})

// ↓↓↓ this route must be top cause of '/all' - ':id' conflict
router.route('/all').get((req, res) => {
  Issue.find()
    .then(issues => res.json(issues))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').get(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
  if (!issue){
    return res.status(404).send('Issue not found').end()
  }
  return res.status(200).json(issue)
})

router.route('/:id').delete(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
  if (!issue){
    return res.status(404).send('Issue not found').end()
  }
  await Issue.findByIdAndRemove(req.params.id)
  return res.status(200).send('successfull operation')
})

router.route('/:id').put(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
  if (!issue){
    return res.status(404).send('Issue not found').end()
  }
  const newIssue = {
    title:req.body.title,
    description:req.body.description,
    labels:req.body.labels,
  }
  objCleaner(newIssue)
  const savedIssue = await Issue.findByIdAndUpdate(req.params.id, newIssue, { new:true })
  return res.status(200).json(savedIssue)
})

module.exports = router
