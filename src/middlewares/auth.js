const jwt = require("jsonwebtoken");

function verifyJWT(req, res, next) {
    const token = req.headers["x-access-token"];

    if (!token) return res.status(401).json({msg: "Token não foi definido"});

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err)
            return res.status(401).json({msg: "Token expirou, usuário deve autenticar novamente"});
    
        //Adiciona informações na requisição para o endpoint:
        req.entityId = decoded.id;
        next();    
    });
}

module.exports = verifyJWT;