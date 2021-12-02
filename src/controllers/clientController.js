const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Delivery = require("../models/Delivery");
const Associate = require("../models/Associate");

module.exports = {
    async listAllClients(req, res){
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
        
        const clients = await Client.findOne({
            where: {cnpj: cnpj},
        });
        
        if (clients) {
            return res.status(200).json({clients});
        }else{ 
            return res.status(404).json({msg:"Não há cliente com esse cnpj"});
        }
    },

    async searchClientById(req, res){
      const id = req.query.id;
       
      const clients = await Client.findOne({
          where: {id: id},
      });
      
      if (clients) {
          return res.status(200).json({clients});
      }else{ 
          return res.status(404).json({msg:"Não há cliente com esse cnpj"});
      }
  },

    async deleteClient(req, res){

        const clientId = req.query.id;

        const deletedClient = await Client.destroy({
            where: {id:clientId},
        }).catch(async (error)=>{
          return res.status(500).json({
            msg:"Erro interno ao excluir o cliente",
            error:error,
          });
        });

        if(deletedClient){
          return res.status(200).json({msg:"Cliente excluído com sucesso"});
        }
        else{ 
          return res.status(404).json({msg:"Cliente não encontrado"});
        }
    },

    async updateClient(req, res){
      const clientId = req.body.id;

      const newData = req.body;

      if(!newData){
        return res.status(422).json({
          msg:"Sem novas informações."
        });
      }
     
      const associateExist = await Associate.findOne({
        where:{cnpj: newData.cnpj}
      });

      if(associateExist){
        return res.status(422).json({
          msg: "CNPJ já cadastrado!"
        });
      }
       const clientExists = await Client.findOne({
          where:{id: clientId}
       });

       if(clientExists){

        await Client.update(newData,{
          where:{id:clientId} 
        }).catch((error) => { 
          return res.status(500).json({
            msg:"Erro interno no servidor",
            erro: error,
          });
        });

        return res.status(200).json({msg:"Cliente alterado com sucesso."});

      }else{
        return res.status(404).json({msg:"Não foi possível encontrar o cliente."})
      }
    },

    async newClient(req, res){

        const {companyName, cnpj, address} = req.body;
        const associateId = req.entityId;
    
        const isClientNew = await Client.findOne({
            where:{cnpj},
        });

        const associateExist = await Associate.findOne({
          where:{cnpj: cnpj}
        });
        
        if(associateExist){
          return res.status(422).json({
            msg: "CNPJ já cadastrado!"
          });
        }

        if (isClientNew){
          return res.status(403).json({
            msg:"Cliente ja foi cadastrado"
          });

        }
        const client = await Client.create({
            cnpj,  
            associateId,
            companyName, 
            address,
        }).catch((error)=>{
          return res.status(500).json({
            msg:"Erro interno do servidor.",
            error:error,
          });
        });
        if(client){
          return res.status(201).json({msg:"Novo cliente foi adicionado"});
        }else{ 
          return res.status(404).json({msg:"Não foi possivel cadastrar novo cliente"});
        }
        
    },
}