const router = require('express').Router()
const Label = require('../models/label.model')
const Issue = require('../models/issue.model')
const { objCleaner } = require('../utils/objUtils')
require('express-async-errors')

router.route('/').post(async (req, res) => {
  const check = await Label.findOne({ text:req.body.text })
  if (check) {
    return res.status(409).send('Label already exist').end()
  }
  const label = new Label({
    text:req.body.text,
    color:req.body.color
  })
  const savedLabel = await label.save()
  return res.status(200).json(savedLabel)
})

router.route('/all').get((req, res) => {
  Label.find()
    .then(labels => res.json(labels))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').put(async (req, res) => {
  let labelToChange = await Label.findById(req.params.id)
  const newLabel = {
    text:req.body.text,
    color:req.body.color
  }
  objCleaner(newLabel)
  if (!labelToChange) {
    return res.status(404).send('Label not found').end()
  }

  const check = await Label.validate(newLabel).catch(() => res.status(405).send('Validation exception').end())
  if (!check){
    const updatedLabel = await Label.findByIdAndUpdate(req.params.id, newLabel, { new:true })
    return res.status(200).json(updatedLabel)
  }
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
