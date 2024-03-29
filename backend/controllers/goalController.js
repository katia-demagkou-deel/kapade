const asyncHandler = require('express-async-handler')

const Goal = require('../models/goalModel')


// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req,res) => {
    const goals = await Goal.find()
    res.status(200).json(goals)
}) 

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoals = asyncHandler(async (req,res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})


// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
if(!goal){
    res.status(400)
    throw new Error('Goal not found! Please select a valid goal to update!') 
}
const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.
    body, {
        new:true,
    })
    res.status(200).json(updatedGoal)
})


// @desc Delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoals = asyncHandler(async (req,res) => {
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found, select a valid goal to delete!')
    }
    const deletedGoal = await Goal.deleteOne()
    res.status(200).json({id: req.params.id})
})


module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}