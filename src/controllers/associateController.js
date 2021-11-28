const Associate = require("../models/Associate");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
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
    async listAllAssociates(req, res){
        const associates = await Associate.findAll({
            order: [["companyName", "ASC"]]
        }).catch((error) => {
            return res.status(500).json({msg: "Falha na conexão.", error: error});
        });

        if (associates) 
            return res.status(200).json({ associates });
        else 
            return res.status(404).json({msg: "Não foi possivel encontrar clientes."});
    },

    async deleteAssociate(req, res){
        const associateId = req.query.id;
        const deletedAssociate = await Associate.destroy({
            where: {id:associateId},
        }).catch(async (error)=>{
            const associateHasRef = await Delivery.findOne({
                where:{associateId: associateId},
            }).catch((error)=>{
                res.status(500).json({msg:"falha na conexao"});
            });
            if(associateHasRef)
            return res.status(403).json({msg:"associado possui entregas em seu nome"});
        });
        if(deletedAssociate !== 0)
            res.status(200).json({msg:"associado excluido com sucesso"});
        else res.status(404).json({msg:"associado nao encontrado"});
    },

    async searchAssociateByCnpj(req, res){
        const cnpj = req.query.cnpj;
        if (!cnpj)
            res.status(400).json({
                msg:"parametro obrigatorio vazio",
            });
        const Op = Sequelize.Op;
        const associates = await Associate.findAll({
            where: {cnpj: { [Op.like]: "%" + cnpj + "%" } },
        });
        
        if (associates) {
            console.log(associates);
            if (associates == "")
                res.status(404).json({msg:"Nao ha associados com esse nome"});
            else res.status(200).json({associates});
        } else res.status(404).json({msg:"nao foi possivel encontrar o associado"});
    }
    ,

    async updateAssociate(req, res){
        const associateId = req.body.id;
        const associate = req.body;
        if (!associateId) res.status(400).json({msg:"ID do associado vazio"});
        else {
            const associateExists = await Associate.findByPk(associateId);
            if(!associateExists)
                res.status(404).json({msg:"Associado nao encontrado"});
            else {
                if (associate.cnpj || associate.companyName){
                    await Associate.update(associate,{
                        where:{id:associateId},
                    });
                    return res.status(200).json({msg:"Associado atualizado com sucesso"});
                } else
                  return res.status.json({msg:"Campos obrigatorios nao preenchidos"});
                }
            }
    },

    async newAssociate(req, res){
        const {cnpj, companyName, password} = req.body;
        if(!cnpj || !companyName || !password){
            res
            .status(400)
            .json({
                msg: "Dados obrigatorios nao foram preenchidos"
            });
        }

        const passwordValid = passwordValidation(password);
        if(passwordValid !== "OK"){
            return res.status(400).json({msg: passwordValid});
        }

        const isAssociateNew = await Associate.findOne({
            where:{cnpj},
        });       

        if (isAssociateNew)
            return res.status(403).json({msg:"Associado ja foi cadastrado"});
        else {

            const salt = bcrypt.genSaltSync(12);
            const hash = bcrypt.hashSync(password, salt);

            const associate = await Associate.create({
                cnpj, 
                companyName, 
                password : hash,
            }).catch((error)=>{
                return res.status(500).json({msg:"Nao foi possivel inserir os dados"});
            });
            if(associate)
                res.status(201).json({msg:"Novo associado foi adicionado"});
            else    
                res.status(404).json({msg:"nao foi possivel cadastrar novo associado"});
        }
    },

    async authentication(req, res){

        const cnpj = req.body.cnpj;
        const password = req.body.password;
        if (!cnpj || !password){
            res.status(400).json({ msg :  "CNPJ e Password são obrigatórios" });
        }

         try {
            const associate = await Associate.findOne({
                where: { cnpj },
            });

            if (!associate){
                return  res.status(404).json({msg:"Usuário ou Senha inválidos."})
            } else {
                if (bcrypt.compareSync(password, associate.password)){
                    const token = generateToken(associate.id);
                    return res.status(200).json({msg : "Autenticado com sucesso.", token : token});
                } else {
                    return res.status(404).json({msg: "Usuário ou Senha inválidos A."});
                }
            }
         } catch(error){
             return res.status(500).json({ msg : "Erro interno no servidor", error: error });
         }
    }
}