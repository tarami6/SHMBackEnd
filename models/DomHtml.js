const mongoose = require('mongoose');

const domHtmlSchema = mongoose.Schema({
    name: {
        type: String,
        reuired: true,
    },
    dom: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('DomHtml', domHtmlSchema)