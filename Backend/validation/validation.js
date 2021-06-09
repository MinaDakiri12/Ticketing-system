const Joi = require('joi');

exports.registerValidation = data=>{

    const schema = Joi.object({
    full_name: Joi.string().min(3).max(100).trim().required(),
    email: Joi.string().email().required(),
    type: Joi.string(),
    password: Joi.string().min(6).required(),
    id_department: Joi.string()
})
    return schema.validate(data)
}

exports.loginValidation = data=>{

    const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})
    return schema.validate(data)
}

exports.ticketValidation = data=>{

    const schema = Joi.object({
    title: Joi.string().min(6).max(100).required(),
    type: Joi.string().min(4).max(100).required(),
    emergency: Joi.string(),
    description: Joi.string().min(10).max(1024).required(),
    state: Joi.string(),
    
})
    return schema.validate(data)
}

exports.departmentValidation = data=>{

    const schema = Joi.object({
    name: Joi.string().min(3).max(100).required(),
    
})
    return schema.validate(data)
}