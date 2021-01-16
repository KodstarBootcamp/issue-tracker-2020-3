const router = require('express').Router()
const { findByIdAndUpdate } = require('../models/issue.model')
const Issue = require('../models/issue.model')
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
  const issues = req.body.issues || []
  let verifiedOrder
  if (unverifiedOrder >= lengthOfStates || unverifiedOrder < 0) {
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
    order_no: verifiedOrder,
    issues
  })
  const savedState = await (await newState.save())
    .execPopulate({ path:'issues', populate:{ path:'createdBy labels assignees' } })
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
  const states = await State.find({})
    .populate({ path:'issues', populate:{ path:'createdBy labels assignees' } })
  return res.status(200).json(states).end()
})

// ↓↓↓ this route must be end of other get methods, cause of route ('/:id') conflict
router.route('/:id').get(async (req, res) => {
  const state = await Issue.findById(req.params.id)
    .populate({ path:'issues', populate:{ path:'createdBy labels assignees' } })
  if (existanceError({ state }, res)) return
  return res.status(200).json(state)
})

router.route('/:id').delete( async (req, res) => {
  checkToken(req)
  const state = await State.findById(req.params.id)
  if (existanceError({ state }, res)) return
  await State.findByIdAndRemove(req.params.id)
  return res.status(200).json({ OK:'successfull operation' })
})

router.route('/:id').put( async (req, res) => {
  checkToken(req)
  const state = await State.findById(req.params.id)
  if (existanceError({ state }, res)) return
  const oldOrder = state.order_no
  const unverifiedOrder = req.body.order_no
  const lengthOfStates = await State.collection.countDocuments()
  let newState
  if (oldOrder === unverifiedOrder) {
    newState = {
      name:req.body.name,
      issues:state.issues,
      order_no:req.body.order_no
    }
    objCleaner(newState)
  } else if (unverifiedOrder < oldOrder) {
    await findByIdAndUpdate(req.params.id, { order_no:-1 })
    for (let i = oldOrder - 1; i >= unverifiedOrder; i--) {
      await State.findOneAndUpdate({ order_no:i }, { order_no:i + 1 })
    }
    newState = {
      name:req.body.name,
      issues:state.issues,
      order_no:req.body.order_no
    }
    objCleaner(newState)
  }
  let verifiedOrder
  if (unverifiedOrder >= lengthOfStates ) {
    verifiedOrder = lengthOfStates
  } else {
    // Assign others order no. Decreasing loop used to keep unique order no.
    for (let i = lengthOfStates - 1; i >= unverifiedOrder; i--) {
      await State.findOneAndUpdate({ order_no:i }, { order_no:i + 1 })
    }
    verifiedOrder = unverifiedOrder
  }
  const check = await State.validate(newState).catch(() => {
    return res.status(400).json({ error:'Validation exception' }).end()
  })
  if (!check){
    const savedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      newState,
      { new:true }
    ).populate('labels createdBy assignees')
    return res.status(200).json(savedIssue)
  }
})

module.exports = router
