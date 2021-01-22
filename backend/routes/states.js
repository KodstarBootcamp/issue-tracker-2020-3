const router = require('express').Router()
const State = require('../models/state.model')
require('express-async-errors')
const {
  objCleaner, checkToken,
  existanceError,
} = require('../utils/utils')
/*
  ! It shall be possible to create/delete new states.
  ! It shall be possible to set state of an issue.
  ! When a state deleted, state of issues with that state will be set to first state.
  ! It shall be prevented to delete last state.
*/
router.route('/').post(async (req, res) => {
  checkToken(req)
  const unverifiedOrder = req.body.order_no
  const lengthOfStates = await State.collection.countDocuments()
  if (existanceError({ name: req.body.name }, res)) return
  let verifiedOrder
  if (
    unverifiedOrder >= lengthOfStates
    || unverifiedOrder < 0
    || unverifiedOrder === undefined
    || unverifiedOrder === null
  ) {
    verifiedOrder = lengthOfStates
  } else {
    // Assign others order no. Decreasing loop used to keep unique order no.
    for (let i = lengthOfStates - 1; i >= unverifiedOrder; i--) {
      await State.findOneAndUpdate({ order_no:i }, { order_no:i + 1 })
    }
    verifiedOrder = unverifiedOrder
  }
  const newState = new State({
    name: req.body.name,
    order_no: verifiedOrder
  })
  const savedState = await newState.save()
  return res.status(201).json(savedState)
})

// router.route('/assign/:id').post( async (req, res) => {
//   checkToken(req)
//   const issue = await Issue.findById(req.params.id)
//   const user = await User.findById(req.body.user)
//   if (existanceError({ user }, res)) return
//   if (existanceError({ issue }, res)) return
//   if (issue.assignees.includes(req.body.user)) {
//     issue.assignees = issue.assignees.filter( id => id.toString() !== req.body.user)
//   } else {
//     issue.assignees = issue.assignees.concat(req.body.user)
//   }
//   const savedIssue = await Issue.findByIdAndUpdate(
//     req.params.id,
//     issue,
//     { new:true }
//   ).populate('labels createdBy assignees')
//   return res.status(200).json(savedIssue)
// })

router.route('/all').get( async (req, res) => {
  const states = await State.find({}).sort('order_no')
  return res.status(200).json(states).end()
})

// ↓↓↓ this route must be end of other get methods, cause of route ('/:id') conflict
router.route('/:id').get(async (req, res) => {
  const state = await State.findById(req.params.id)
  if (existanceError({ state }, res)) return
  return res.status(200).json(state)
})

router.route('/:id').delete( async (req, res) => {
  checkToken(req)
  const state = await State.findById(req.params.id)
  if (existanceError({ state }, res)) return
  const length = await State.collection.countDocuments()
  if (length > 1) {
    await State.findByIdAndRemove(req.params.id)
    if (state.order_no < length - 1) {
      for (let i = state.order_no + 1; i < length; i++) {
        await State.findOneAndUpdate({ order_no:i }, { order_no:i - 1 })
      }
    }
    return res.status(200).json({ OK:'successfull operation' })
  } else {
    return res.status(400).json({ error:'The last state can\'t delete' })
  }
})

router.route('/:id').put( async (req, res) => {
  checkToken(req)
  const state = await State.findById(req.params.id)
  if (existanceError({ state }, res)) return
  const oldOrder = state.order_no
  const unverifiedOrder = req.body.order_no === undefined || req.body.order_no === null ? oldOrder : req.body.order_no
  const name = req.body.name || state.name
  if (name !== state.name) {
    if ((await State.find({ name })).length > 0) {
      return res.status(409).json({ error:'State already exist. Dup value: name' })
    }
  }
  if (unverifiedOrder < oldOrder) {
    await State.findByIdAndUpdate(req.params.id, { order_no:-1 })
    for (let i = oldOrder - 1; i >= unverifiedOrder; i--) {
      await State.findOneAndUpdate({ order_no:i }, { order_no:i + 1 })
    }
  } else if (unverifiedOrder > oldOrder) {
    await State.findByIdAndUpdate(req.params.id, { order_no:-1 })
    for (let i = oldOrder + 1; i <= unverifiedOrder; i++) {
      await State.findOneAndUpdate({ order_no:i }, { order_no:i - 1 })
    }
  }
  const newState = {
    name,
    order_no:unverifiedOrder
  }
  objCleaner(newState)
  const checkValidation = await State.validate(newState).catch(() => {
    return res.status(400).json({ error:'Validation exception' }).end()
  })
  if (!checkValidation){
    const savedIssue = await State.findByIdAndUpdate(
      req.params.id,
      newState,
      { new:true }
    )
    return res.status(200).json(savedIssue)
  }
})

module.exports = router
