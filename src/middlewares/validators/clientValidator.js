//const schema = requier();

function validade(req, res, next) {

    switch (req.route.path){
        case '/listAllClients':
            return next();

        case '/listClientByCnpj':
            return next();

        case '/listClientById':
            return next();

        case '/deleteClient':
            return next();

        case '/updateClient':
            return next();

        default:
            return next();
    }
    
    //next();    
}

module.exports = validade;