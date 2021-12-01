const schema = require("../../schemas/associateSchema");

function validade(req, res, next) {

    switch (req.route.path){
        case '/listAllAssociates':
            return next();
            
        case '/listAssociateByCnpj':
            return next();

        case '/authentication':
            return next();

        case '/newAssociate':
            return next();

        case '/deleteAssociate':
            return next();

        case '/updateAssociate':
            return next();

        default:
            return next();
    }
    
    //next();    
}

module.exports = validade;