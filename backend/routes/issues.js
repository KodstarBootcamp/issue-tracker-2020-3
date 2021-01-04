const router = require('express').Router()
const Issue = require('../models/issue.model')
const Label = require('../models/label.model')
require('express-async-errors')
const objCleaner = require('../utils/objUtils').objCleaner

router.route('/').post(async (req, res) => {
  const title = req.body.title
  const description = req.body.description
  let unverifiedLabels = []
  if (req.body.labels){
    unverifiedLabels = req.body.labels
  }
  const check = await Issue.findOne({ title:req.body.title })
  if (check) {
    return res.status(409).send('Issue already exist').end()
  }
  const verifiedLabels = []
  if (unverifiedLabels.length) {
    for (let label of unverifiedLabels) {
      const checkedLabel = await Label.findOne({ text:label.text })
      if (checkedLabel) {
        if (label.color && checkedLabel.color !== label.color){
          checkedLabel.color = label.color
          await checkedLabel.save()
        }
        verifiedLabels.push(checkedLabel._id)
      } else {
        const newLabel = new Label({
          text:label.text,
          color:label.color
        })
        const savedLabel = await newLabel.save()
        verifiedLabels.push(savedLabel._id)
      }
    }
  }
  const newIssue = new Issue({
    title,
    description,
    labels:verifiedLabels
  })
  const savedIssue = await (await newIssue.save()).execPopulate('labels')
  return res.status(201).json(savedIssue)
})

// ↓↓↓ this route must be top cause of '/all' - ':id' conflict
router.route('/all').get(async (req, res) => {
  const sortTypes = [
    'createdAt', 'updatedAt','title',
    '-createdAt', '-updatedAt','-title'
  ]
  if (req.query.sort && !sortTypes.includes(req.query.sort)){
    return res.status(405).send('unavailable type of sort').end()
  }
  if (!req.query.start && !req.query.count) {
    const issues = await Issue.find({}).sort(req.query.sort).populate('labels')
    return res.status(200).json(issues).end()
  }
  const skip = Number.parseInt(req.query.start) || 0
  const limit = Number.parseInt(req.query.count) || 10
  const issues = await Issue.find({}, null, { skip, limit }).sort(req.query.sort).populate('labels')
  return res.status(200).json(issues).end()
})

router.route('/:id').delete(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
  if (!issue) {
    return res.status(404).send('Issue not found').end()
  }
  await Issue.findByIdAndRemove(req.params.id)
  return res.status(200).send('successfull operation')
})

router.route('/:id').put(async (req, res) => {
  const issue = await Issue.findById(req.params.id)
  const unverifiedLabels = req.body.labels
  if (!issue) {
    return res.status(404).send('Issue not found').end()
  }
  let verifiedLabels
  if (req.body.labels) {
    verifiedLabels = []
    if (unverifiedLabels.length){
      for (let label of unverifiedLabels) {
        const checkedLabel = await Label.findOne({ text:label.text })
        if (checkedLabel){
          if (checkedLabel.color !== label.color){
            checkedLabel.color = label.color
            await checkedLabel.save()
          }
          verifiedLabels.push(checkedLabel._id)
        } else {
          const newLabel = new Label({
            text:label.text,
            color:label.color
          })
          const savedLabel = await newLabel.save()
          verifiedLabels.push(savedLabel._id)
        }
      }
    }
  }
  const newIssue = {
    title:req.body.title,
    description:req.body.description,
    labels:verifiedLabels
  }
  objCleaner(newIssue)
  const check = await Issue.validate(newIssue).catch(() => res.status(405).send('Validation exception').end())
  if (!check){
    const savedIssue = await Issue.findByIdAndUpdate(req.params.id, newIssue, { new:true }).populate('labels')
    return res.status(200).json(savedIssue)
  }
})

module.exports = router
