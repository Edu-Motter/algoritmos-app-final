const Joi = require("joi");

const deliverySchema = Joi.object().keys({
    id: Joi.number().integer(),
    delivered: Joi.boolean(),
    value: Joi.number().positive().precision(2),
    date: Joi.date(),
    description: Joi.string(),   
});

module.exports = associateSchema;