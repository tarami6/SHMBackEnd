const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/SignUpModels')

router.post('/signup', (request, response) => {
    const signUpUser = new signUpTemplateCopy({

    })
})
 
module.exports = router