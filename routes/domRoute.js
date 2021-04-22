const router = require('express').Router();
const verify = require('./verifyToken')
const { domHtmlValidationSave, domHtmlValidationUpdate } = require('../validation')
const User = require('../models/User')
const DomHtml = require('../models/DomHtml')

// router.get('/', verify, async (req, res) => {
//     const user = await User.findOne({_id: req.user.id})
//     console.log('user', user)
//     res.json({posts: {title: 'my first post', description: 'description test user'}})
// })

router.post('/save', verify, async (req, res) => {
    console.log('req.body', req.body)
    const error = domHtmlValidationSave(req.body);
    if (error) {
        return res.status(206).send(error);
    }

    const htmlNameExists = await DomHtml.find({ name: req.body.name })
    console.log('htmlNameExists', htmlNameExists)
    if (htmlNameExists && htmlNameExists.length) {
        return res.status(206).send("File Name already exists");
    }

    const html = new DomHtml({
        name: req.body.name,
        dom: {
            body: req.body.body,
            columns: req.body.columns,
            elements: req.body.elements,
            rows: req.body.rows,
        }
    })
    try {
        await html.save()
        res.send({ html: html.id })
    } catch (err) {
        res.status(400).send(err)
    }

})

router.put('/update/:id', verify, async (req, res) => {
    console.log('req.body', req.body)
    const error = domHtmlValidationUpdate(req)
    if (error) {
        return res.status(206).send(error);
    }
    try {
        const file = await DomHtml.findById(req.params.id)
        if (req.body.name.length && req.body.name !== file.name) {
            file.name = req.body.name
        }
        if (req.body) {
            delete req.body.name
            file.dom = req.body
        }
        file.save()
        return res.status(200).json({ message: file })
    } catch (err) {
        res.status(500).json({ error: err })
    }
})

router.delete('/delete/:id', verify, async (req, res) => {
    console.log('req.body', req.params.id)
    const error = domHtmlValidationUpdate(req)
    if (error) {
        return res.status(206).send(error);
    }
    try {
        await DomHtml.deleteOne({ _id: req.params.id })
        return res.status(200).json({ message: 'file deleted' })
    } catch (err) {
        rres.status(500).json({ error: err })
    }
})

router.get('/', verify, async (req, res) => {
    try {
        const allFiles = await DomHtml.find()
        if (allFiles) {
            return res.status(200).json({ files: allFiles })
        }
    } catch (e) {
        return res.status(500).json({ error: e })
    }
})



module.exports = router