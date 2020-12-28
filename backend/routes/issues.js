const router = require('express').Router()
const Issue = require('../models/issue.model')
const Label = require('../models/label.model')
require('express-async-errors')
const objCleaner = require('../utils/objUtils').objCleaner

router.route('/').post(async (req, res) => {
  const title = req.body.title
  const description = req.body.description
  const unverifiedLabels = req.body.labels
  const date = Date.parse(req.body.date)
  const check = await Issue.findOne({ title:req.body.title })
  if (check) {
    return res.status(409).send('Issue already exist').end()
  }
  const verifiedLabels = []
  if (unverifiedLabels.length) {
    for (let label of unverifiedLabels) {
      const checkedLabel = await Label.findOne({ text:label.text })
      if (checkedLabel) {
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
  const newIssue = new Issue({
    title,
    description,
    date,
    labels:verifiedLabels
  })
  const savedIssue = await (await newIssue.save()).execPopulate('labels')
  return res.status(200).json(savedIssue)
})

// ↓↓↓ this route must be top cause of '/all' - ':id' conflict
router.route('/all').get(async (req, res) => {
  const issues = await Issue.find({}).populate('labels')
  res.status(200).json(issues).end()
})

router.route('/paginate/:slice').get(async (req, res) => {
  const slice = String(req.params.slice)
  const sliceHasDash = slice.includes('-')
  let skip
  let limit
  if (sliceHasDash) {
    skip = Number.parseInt(slice.split('-')[0])
    limit = Number.parseInt(slice.split('-')[1]) - skip
  } else {
    skip = 0
    limit = Number.parseInt(slice)
  }
  const issues = await Issue.find({}, null, { skip, limit }).populate('labels')
  res.status(200).json(issues)
})
router.route('/:id').get(async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate('labels')
  if (!issue){
    return res.status(404).send('Issue not found').end()
  }
  return res.status(200).json(issue)
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
    date: Date.parse(req.body.date),
    labels:verifiedLabels
  }
  objCleaner(newIssue)
  const savedIssue = await Issue.findByIdAndUpdate(req.params.id, newIssue, { new:true }).populate('labels')
  return res.status(200).json(savedIssue)
})

module.exports = router
