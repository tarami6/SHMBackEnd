const router = require('express').Router();
const verify = require('./verifyToken')
const User = require('../models/User')

router.get('/', verify, async (req, res) => {
    const user = await User.findOne({_id: req.user.id})
    console.log('user', user)
    res.json({posts: {title: 'my first post', description: 'description test user'}})
})

module.exports = router