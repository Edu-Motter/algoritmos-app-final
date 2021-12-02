const {
    newValidation,
    updateValidation,
    deleteValidation,
    listByCnpjValidation } = require("../../schemas/associateSchema");


function validade(req, res, next) {

    switch (req.route.path){
        //Routes for ACP:
        case '/listAllAssociates':
            return next();
            
        case '/listAssociateByCnpj':
            const listByCnpj = listByCnpjValidation.validate(req.query);
            if (listByCnpj.error){
                return res.status(422).json(listByCnpj.error.details);
            } else if (listByCnpj.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/newAssociate':
            const newBody = newValidation.validate(req.body);
            if (newBody.error){
                return res.status(422).json(newBody.error.details);
            } else if (newBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/deleteAssociate':
            const deleteBody = deleteValidation.validate(req.query);
            if (deleteBody.error){
                return res.status(422).json(deleteBody.error.details);
            } else if (deleteBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        case '/updateAssociate':
            const updateBody = updateValidation.validate(req.body);
            if (updateBody.error){
                return res.status(422).json(updateBody.error.details);
            } else if (updateBody.value) {
                return next();
            } else {
                return res.status(500);
            }

        //Routes for Associate
        case '/authentication':
            return next();
    
        default:
            return next();
    }
    
    //next();    
}

module.exports = validade;