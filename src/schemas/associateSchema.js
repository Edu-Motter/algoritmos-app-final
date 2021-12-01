const Joi = require("joi");

const associateSchema = Joi.object().keys({
    id: Joi.number().integer(),
    companyName: Joi.string(),
    cnpj: Joi.string()
        .min(18)
        .max(18)
        .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

const associateUpdateSchema = Joi.object().keys({
    id: Joi.number().integer(),
    companyName: Joi.string(),
    cnpj: Joi.string()
        .min(18)
        .max(18)
        .pattern(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/),
});

module.exports = associateSchema;