const Associate = require("../models/Associate");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
const Delivery = require("../models/Delivery");

function passwordValidation(password) {
  if (password.length < 8 || !password.match(/[a-zA-Z]/g) || !password.match(/[0-9]+/)){
    return false;
  }else{
    return true;
  }
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
            return res.status(500).json({msg: "Falha na conex√£o.", error: error});
        });

        if (associates){
            return res.status(200).json({ associates });
        }else{
            return res.status(404).json({msg: "N„o foi possivel encontrar clientes."});
        }
    },

    async deleteAssociate(req, res){
        const associateId = req.query.id;

        const deletedAssociate = await Associate.destroy({
            where: {id:associateId},
        });
     
        if(deletedAssociate){
          return res.status(200).json({msg:"Associado excluido com sucesso"});
        }else{
          return res.status(404).json({msg:"Associado nao encontrado"});
        } 
          
    },

    async searchAssociateByCnpj(req, res){
        const cnpj = req.query.cnpj;
        if (!cnpj)
            res.status(400).json({
                msg:"parametro obrigatorio vazio",
            });

        const associate = await Associate.findOne({
            where: {cnpj: cnpj },
        });
        
        if (associate) {
          if (associate){
            return res.status(200).json({associate});
          }else{
            return res.status(404).json({msg:"N„o h· associados com esse cnpj"});
          } 
        } else res.status(404).json({msg:"N„o foi possÌvel encontrar o associado"});
    }
    ,

    async updateAssociate(req, res){
        const associateId = req.body.id;
        const associate = req.body.data;
       
        if (!associateId){
          return res.status(400).json({msg:"ID do associado vazio"});
        }
        else {
            const associateExists = await Associate.findByPk(associateId);
            if(!associateExists){  
              return res.status(404).json({msg:"Associado nao encontrado"});
            }
            else {
                if (associate.cnpj || associate.companyName ){
                    await Associate.update(associate,{
                        where:{id:associateId},
                    }).catch((error) => {
                      return res.status(500).json({
                        msg:"Erro interno no servidor",
                        error:error,
                      });
                    })
                    return res.status(200).json({msg:"Associado atualizado com sucesso"});
                } else
                    return res.status(400).json({msg:"Campos obrigatorios nao preenchidos"});
                }
            }
    },

    async newAssociate(req, res){

        const {cnpj, companyName, password, address} = req.body;
        if(!cnpj || !companyName || !password || !address){
            return res.status(400).json({
                msg: "Dados obrigatorios nao foram preenchidos"
            });
        }

        const passwordValid = passwordValidation(password);
       
        if(!passwordValid){
            return res.status(400).json({msg: "Senha Inv·lida! A senha deve conter 8 caracteres, no mÌnimo 1 letra e 1 n˙mero!"});
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
                password: hash,
                address,
            }).catch((error)=>{
                return res.status(500).json({
                  msg:"Nao foi possivel inserir os dados",
                  error:error,
                });
            });
            if(associate){
                res.status(201).json({msg:"Novo associado foi adicionado"});
            }else{    
                res.status(404).json({msg:"nao foi possivel cadastrar novo associado"});
            }
        }
    },

    async authentication(req, res){

        const cnpj = req.body.cnpj;
        const password = req.body.password;
        if (!cnpj || !password){
            res.status(400).json({ msg :  "CNPJ e Password s√£o obrigat√≥rios" });
        }

         try {
            const associate = await Associate.findOne({
                where: { cnpj },
            });

            if (!associate){
                return  res.status(404).json({msg:"Usu√°rio ou Senha inv√°lidos."})
            } else {
                if (bcrypt.compareSync(password, associate.password)){
                    const token = generateToken(associate.id);
                    return res.status(200).json({msg : "Autenticado com sucesso.", token : token});
                } else {
                    return res.status(404).json({msg: "Usu√°rio ou Senha inv√°lidos A."});
                }
            }
         } catch(error){
             return res.status(500).json({ msg : "Erro interno no servidor", error: error });
         }
    }
}