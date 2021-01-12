const router = require('express').Router()
const Issue = require('../models/issue.model')
const Label = require('../models/label.model')
const User = require('../models/user.model')
require('express-async-errors')
const {
  objCleaner, checkToken, createFilter,
  existanceError, validateDateError
} = require('../utils/utils')

router.route('/').post(async (req, res) => {
  const decodedToken = checkToken(req)
  const title = req.body.title
  const description = req.body.description
  let unverifiedLabels = []
  if (req.body.labels) {
    unverifiedLabels = req.body.labels
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
    labels:verifiedLabels,
    createdBy:decodedToken.id
  })
  const savedIssue = await (await newIssue.save()).execPopulate('labels createdBy')
  return res.status(201).json(savedIssue)
})

router.route('/assign/:id').post( async (req, res) => {
  checkToken(req)
  const issue = await Issue.findById(req.params.id)
  const user = await User.findById(req.body.user)
  if (existanceError({ user }, res)) return
  if (existanceError({ issue }, res)) return
  if (issue.assignees.includes(req.body.user)) {
    issue.assignees = issue.assignees.filter( id => id.toString() !== req.body.user)
  } else {
    issue.assignees = issue.assignees.concat(req.body.user)
  }
  const savedIssue = await Issue.findByIdAndUpdate(
    req.params.id,
    issue,
    { new:true }
  ).populate('labels createdBy assignees')
  return res.status(200).json(savedIssue)
})

router.route('/all').get( async (req, res) => {
  const sortTypes = [
    'createdAt', 'updatedAt', 'title',
    '-createdAt', '-updatedAt', '-title'
  ]
  if (req.query.sort && !sortTypes.includes(req.query.sort)) {
    return res.status(405).error({ error: 'unavailable type of sort' }).end()
  }
  if (validateDateError(req, res)) return
  const filter = createFilter(req)
  if (!req.query.start && !req.query.count) {
    const issues = await Issue.find(filter)
      .sort(req.query.sort)
      .populate('labels createdBy assignees')
    return res.status(200).json(issues).end()
  }
  const skip = Number.parseInt(req.query.start) || 0
  const limit = Number.parseInt(req.query.count) || 10
  const issues = await Issue.find(filter, null, { skip, limit })
    .sort(req.query.sort)
    .populate('labels createdBy assignees')
  return res.status(200).json(issues).end()
})

router.route('/count').get(async (req, res) => {
  const count = await Issue.collection.countDocuments()
  res.status(200).json({ count }).end()
})

// ↓↓↓ this route must be end of other get methods, cause of route ('/:id') conflict
router.route('/:id').get(async (req, res) => {
  const issue = await Issue.findById(req.params.id).populate('labels createdBy assignees')
  if (existanceError({ issue }, res)) return
  return res.status(200).json(issue)
})

router.route('/:id').delete( async (req, res) => {
  checkToken(req)
  const issue = await Issue.findById(req.params.id)
  if (existanceError({ issue }, res)) return
  await Issue.findByIdAndRemove(req.params.id)
  return res.status(200).json({ OK:'successfull operation' })
})

router.route('/:id').put( async (req, res) => {
  checkToken(req)
  const issue = await Issue.findById(req.params.id)
  const unverifiedLabels = req.body.labels
  if (existanceError({ issue }, res)) return
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
  const check = await Issue.validate(newIssue).catch(() => {
    return res.status(400).json({ error:'Validation exception' }).end()
  })
  if (!check){
    const savedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      newIssue,
      { new:true }
    ).populate('labels createdBy assignees')
    return res.status(200).json(savedIssue)
  }
})

module.exports = router
