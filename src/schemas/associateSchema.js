const Joi = require("joi");

const newValidation = Joi.object().keys({
    companyName: Joi.string()
    .required(),

    cnpj: Joi.string()
    .min(18)
    .max(18)
    .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
    .required(),

    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/)
    .required(),

    address: Joi.string()
});

const updateValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),

    companyName: Joi.string(),
    
    cnpj: Joi.string()
    .min(18)
    .max(18)
    .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
    
    password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),

    address: Joi.string()
});

const deleteValidation = Joi.object().keys({
    id: Joi.number()
    .integer()
    .required(),
});

const listByCnpjValidation = Joi.object().keys({
    cnpj: Joi.string()
    .min(18)
    .max(18)
    .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/)
    .required(),
});

module.exports.newValidation = newValidation;
module.exports.updateValidation = updateValidation;
module.exports.deleteValidation = deleteValidation;
module.exports.listByCnpjValidation = listByCnpjValidation;

