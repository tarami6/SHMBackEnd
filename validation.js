const Joi = require('@hapi/joi')

const registerValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(6).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);

}

const loginValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });

    return schema.validate(data);
}

const domHtmlValidationSave = data => {
    let error = undefined
    if(!data.name){
        error =  'Name is required'
    } else if(!data.dom){
        error =  'Elements is required'
    }
    return error
}

const domHtmlValidationUpdate = data => {
    let error = undefined
    if(!data.params.id){
        error =  'No Id'
    } 
    return error
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
module.exports.domHtmlValidationSave = domHtmlValidationSave
module.exports.domHtmlValidationUpdate = domHtmlValidationUpdate