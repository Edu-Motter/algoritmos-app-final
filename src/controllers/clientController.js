const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Delivery = require("../models/Delivery");


function passwordValidation(password) {
    if (password.length < 8) 
        return "Senha deve ter no mínimo 8 caracteres";
    else if (!password.match(/[a-zA-Z]/g))
        return "Senha deve ter no mínimo uma letra";
    else if (!password.match(/[0-9]+/))
        return "Senha deve ter no mínimo um número";
    else 
        return "OK";
}

function generateToken(id){
    console.log(process.env.JWT_SECRET);
    process.env.JWT_SECRET = Math.random().toString(36).slice(-20);
    console.log(process.env.JWT_SECRET);

    const token = jwt.sign({ id }, process.env.JWT_SECRET, 
        {expiresIn : 86400} //24hrs
    );
    
    console.log(token);
    return token;
}

module.exports = {
    async listAllClients(req, res){
        //return res.status(400).json({msg: "Implementar essa rota"});
        const clients = await Client.findAll({
            order: [["companyName", "ASC"]]
        }).catch((error) => {
            return res.status(500).json({msg: "Falha na conexão.", error: error});
        });

        if (clients) 
            return res.status(200).json({ clients });
        else 
            return res.status(404).json({msg: "Não foi possivel encontrar clientes."});
    },
    async searchClientByCnpj(req, res){
        const cnpj = req.query.cnpj;
        if (!cnpj)
            res.status(400).json({
                msg:"parametro obrigatorio vazio",
            });
        const Op = Sequelize.Op;
        const clients = await Client.findAll({
            where: {cnpj: { [Op.like]: "%" + cnpj + "%" } },
        });
        
        if (clients) {
            console.log(clients);
            if (clients == "")
                res.status(404).json({msg:"Nao ha cliente com esse cnpj"});
            else res.status(200).json({clients});
        } else res.status(404).json({msg:"nao foi possivel encontrar o cliente"});
    },

    async deleteClient(req, res){
        const clientId = req.query.id;
        const deletedClient = await Client.destroy({
            where: {id:clientId},
        }).catch(async (error)=>{
            const clientHasRef = await Delivery.findOne({
                where:{clientId: clientId},
            }).catch((error)=>{
                res.status(500).json({msg:"falha na conexao"});
            });
            if(clientHasRef)
            return res.status(403).json({msg:"cliente possui consultas em seu nome"});
        });
        if(deletedClient !== 0)
            res.status(200).json({msg:"cliente excluido com sucesso"});
        else res.status(404).json({msg:"cliente nao encontrado"});
    },

    async updateClient(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const physicianId = req.body.id;
        // const physician = req.body;
        // if (!physicianId) res.status(400).json({msg:"ID do medico vazio"});
        // else {
        //     const physicianExists = await Physician.findByPk(physicianId);
        //     if(!physicianExists)
        //         res.status(404).json({msg:"Medico nao encontrado"});
        //     else {
        //         if (physician.name || physician.email){
        //             await Physician.update(physician,{
        //                 where:{id:physicianId},
        //             });
        //             return res.status(200).json({msg:"Medico atualizado com sucesso"});
        //         } else
        //           return res.status.json({msg:"Campos obrigatorios nao preenchidos"});
        //         }
        //     }
    },

    async newClient(req, res){
        const {companyName, cnpj, address} = req.body;
        if(!companyName || !cnpj || !address){
            res
            .status(400)
            .json({
                msg: "Dados obrigatorios nao foram preenchidos"
            });
        }

        const isClientNew = await Client.findOne({
            where:{cnpj},
        });

        if (isClientNew)
            res.status(403).json({msg:"Cliente ja foi cadastrado"});
        else {
            const client = await Client.create({
                companyName, 
                cnpj, 
                address,
            }).catch((error)=>{
                res.status(500).json({msg:"N�o foi possivel inserir os dados"});
            });
            if(client)
                res.status(201).json({msg:"Novo cliente foi adicionado"});
            else    
                res.status(404).json({msg:"N�o foi possivel cadastrar novo cliente"});
        }
    },

    async authentication(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const email = req.body.email;
        // const password = req.body.password;
        // if (!email || !password){
        //     res.status(400).json({ msg :  "Email e Password são obrigatórios" });
        // }

        //  try {
        //     const physician = await Physician.findOne({
        //         where: { email },
        //     });

        //     if (!physician){
        //         return  res.status(404).json({msg:"Usuário ou Senha inválidos."})
        //     } else {
        //         if (bcrypt.compareSync(password, physician.password)){
        //             const token = generateToken(physician.id);
        //             return res.status(200).json({msg : "Autenticado com sucesso.", token : token});
        //         } else {
        //             return res.status(404).json({msg: "Usuário ou Senha inválidos A."});
        //         }
        //     }
        //  } catch(error){
        //      return res.status(500).json({ msg : "Erro interno no servidor", error: error });
        //  }
    }
}