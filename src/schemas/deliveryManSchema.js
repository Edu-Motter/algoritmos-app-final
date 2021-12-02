const Joi = require("joi");

const newValidation = Joi.object().keys({
    associateId: Joi.number()
    .integer()
    .required(),

    name: Joi.string()
    .required(),

    cpf: Joi.string()
    .min(13)
    .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
    .required(),

    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),

    phone: Joi.string(),
});

const updateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),

    associateId: Joi.number()
    .integer(),
        
    name: Joi.string(),

    cpf: Joi.string()
    .min(13)
    .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/),

    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
        
    phone: Joi.string(),
});

const deleteValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const searchByCpfValidation = Joi.object().keys({
    cpf: Joi.string()
    .min(13)
    .pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
    .required(),
});

const searchByIdValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const searchByAssociateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

module.exports.newValidation = newValidation;
module.exports.updateValidation = updateValidation;
module.exports.searchByCpfValidation = searchByCpfValidation;
module.exports.searchByIdValidation = searchByIdValidation;
module.exports.searchByAssociateValidation = searchByAssociateValidation;