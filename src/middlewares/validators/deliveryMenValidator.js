const { 
    newValidation, 
    updateValidation,
    searchByIdValidation,
    searchByCpfValidation,
    searchByAssociateValidation } = require("../../schemas/deliveryManSchema");
 
function validade(req, res, next) {
    
    switch (req.route.path){
        
        case '/listAllDeliveryMen':
            return next();

        case '/newDeliveryMan':
            const newBody = newValidation.validate(req.body);
            if (newBody.error){
                return res.status(422).json(newBody.error.details);
            } else if (newBody.value) {
                return next();
            }

        case '/updateDeliveryMan':
            const updateBody = updateValidation.validate(req.body);
            if (updateBody.error){
                return res.status(422).json(updateBody.error.details);
            } else if (updateBody.value) {
                return next();
            }

        case '/searchDeliveryManById':
            const searchById = searchByIdValidation.validate(req.query);
            if (searchById.error){
                return res.status(422).json(searchById.error.details);
            } else if (searchById.value) {
                return next();
            }

        case '/searchDeliveryManByCpf':
            const searchByCpf = searchByCpfValidation.validate(req.query);
            if (searchByCpf.error){
                return res.status(422).json(searchByCpf.error.details);
            } else if (searchByCpf.value) {
                return next();
            }

        case '/searchDeliveryMenByAssociate':
            const searchByAssociate = searchByAssociateValidation.validate(req.query);
            if (searchByAssociate.error){
                return res.status(422).json(searchByAssociate.error.details);
            } else if (searchByAssociate.value) {
                return next();
            }

        default:
            return next();
    }
}

module.exports = validade;