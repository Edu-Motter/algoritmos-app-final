//const schema = requier();

function validade(req, res, next) {

    switch (req.route.path){
        case '/listAllClients':
            return next();

        case '':
            return next();

        case '':
            return next();

        case '':
            return next();

        case '':
            return next();

        default:
            return next();
    }
    
    //next();    
}

module.exports = validade;