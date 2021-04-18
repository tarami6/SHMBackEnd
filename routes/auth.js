const router = require('express').Router()
const User = require('../models/User')
const { registerValidation, loginValidation } = require('../validation')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    //Cheking if user exists
    const emailExist = await User.find({ email: req.body.email })
    if (emailExist && emailExist.length) {
        return res.status(400).send("Email already exists");
    }

    //Hash The Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    //Create new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })
    try {
        await user.save()
        res.send({ user: user.id })
    } catch (err) {
        rres.status(500).json({error: err})
    }
})

router.post('/login', async (req, res) => {
    console.log('req', req.body)
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(201).send({ error: error.details[0].message });
    }
    try {
        //Cheking if user exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(201).send({ error: "Email is wrong" });
        }

        // Hash The Password
        const validPassword = await bcrypt.compare(req.body.password, user.password)
        if (!validPassword) {
            return res.status(400).send("Password is wrong")
        }
        //Create and assign
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
        res.header('auth-token', token).send({ token })
    } catch(e){
        res.status(500).json({error: err})
    }
})

module.exports = router