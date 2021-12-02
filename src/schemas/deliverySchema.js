const Joi = require("joi");

const newValidation = Joi.object().keys({
    associateId: Joi.number()
    .integer()
    .required(),
    
    deliveryManId: Joi.number()
    .integer()
    .required(),
    
    clientId: Joi.number()
    .integer()
    .required(),
    
    description: Joi.string()
    .required(),
    
    delivered: Joi.boolean(),
    
    value: Joi.number().positive().precision(2),
    
    deliveredAt: Joi.date(),    
});

const updateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
    
    associateId: Joi.number().integer(),
    
    deliveryManId: Joi.number().integer(),
    
    clientId: Joi.number().integer(),
    
    description: Joi.string(),
    
    delivered: Joi.boolean(),
    
    value: Joi.number().positive().precision(2),
    
    deliveredAt: Joi.date(),    
});

const deleteValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const searchByIdValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const endValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
    
    value: Joi.number().positive().precision(2).required(),   
});

module.exports = associateSchema;