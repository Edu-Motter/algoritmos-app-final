const DeliveryMan = require("../models/DeliveryMan");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");

function passwordValidation(password) {
  if (password.length < 8 || !password.match(/[a-zA-Z]/g) || !password.match(/[0-9]+/)){
    return false;
  }else{
    return true;
  }
}

module.exports = {
  
    async listAllDeliveryMen(req, res){
      const deliveryMen = await DeliveryMan.findAll({
        order: [["name", "ASC"]]
      }).catch((error) => {
        return res.status(500).json({msg: "Falha na conexão.", error: error});
      });

      if (deliveryMen) 
        return res.status(200).json({ deliveryMen });
      else 
        return res.status(404).json({msg: "Não foi possivel encontrar clientes."});
    },

    async newDeliveryMan(req, res){
        const {associateId, name, cpf, password, phone} = req.body;
         if (!name || !cpf || !password || !phone || !associateId){
            return res.status(400).json({
                msg:"Dados obrigatórios não foram preenchidos"
            });
         }
         if(cpf.length != 11){
            return res.status(400).json({
              msg:"CPF inválido"
          });
         }
         if(!passwordValidation(password)){
            return res.status(400).json({
              msg:"Senha Inválida! A senha deve conter 8 caracteres, no mínimo 1 letra e 1 número!"
            })
         }

         const deliverymanExists = await DeliveryMan.findOne({
             where: {cpf},
         }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            erro: error,
         });
        });
      

         if(deliverymanExists){
          return res.status(403).json({msg:"Deliveryman já cadastrado"});
         }else{
            const d = await DeliveryMan.create({
              associateId,
              name,
              cpf,
              password,
              phone,

            }).catch((error) => {
              return  res.status(500).json({msg:"Erro interno no servidor",
                erro: error,
              });
            });
            
            return res.status(201).json({msg:"Novo entregador adicionado com sucesso"});
            
          }

    },

    async searchDeliveryManByCpf(req, res){
        const cpf = req.query.cpf;
        if (!cpf)
            return res.status(400).json({
                msg:"CPF do entregador não informado"
            });       

        const deliverymen = await DeliveryMan.findAll({
            where:[
              {cpf: cpf},
            ]
        }).catch(async (error) => {
            return res.status(500).json({msg:"Erro interno no servidor"});
        });

        if(deliverymen.length > 0) 
            return res.status(200).json({deliverymen});            
        else 
            return res.status(404).json({msg:"Não foi possível encontrar nenhum entregador com esse cpf "}); 
    },

    async searchDeliveryManById(req, res){
      const id = req.query.id;
      if (!id)
          return res.status(400).json({
              msg:"ID do entregador não informado"
          });       

      const deliverymen = await DeliveryMan.findAll({
          where:[
            {id: id},
          ]
      }).catch(async (error) => {
          return res.status(500).json({msg:"Erro interno no servidor"});
      });

      if(deliverymen.length > 0) 
          return res.status(200).json({deliverymen});            
      else 
          return res.status(404).json({msg:"Não foi possível encontrar nenhum entregador com esse id "}); 
  },

    async searchDeliveryMenByAssociate(req, res){
         const id = req.query.id;
         if (!id)
             return res.status(400).json({
                 msg:"Id do associado não foi informado"
             });       

         const deliverymen = await DeliveryMan.findAll({
             where:[
               {associateId: id},
             ]
         }).catch(async (error) => {
             return res.status(500).json({msg:"Erro interno no servidor"});
         });

         if(deliverymen.length > 0) 
             return res.status(200).json({deliverymen});            
         else 
             return res.status(404).json({msg:"Não foi possível encontrar nenhum entregador para esse associado "});  
    },
    
  async updateDeliveryMan(req, res){
        const deliverymanId = req.body.id;

        const newData = req.body.data;

        if(!deliverymanId){
          return res.status(400).json({
            msg:"ID do entregador não inserido"
          });
        }
        if (!newData.name || !newData.cpf || !newData.password || !newData.phone || !newData.associateId){
             return res.status(400).json({
                msg:"Dados obrigatórios não foram preenchidos"
            });
        }
        if(newData.cpf.length != 11){
            return res.status(400).json({
              msg:"CPF inválido"
          });
        }
        if(!passwordValidation(newData.password)){
           return res.status(400).json({
             msg:"Senha Inválida! A senha deve conter 8 caracteres, no mínimo 1 letra e 1 número!"
           })
        }

         const deliverymanExists = await DeliveryMan.findOne({
            where:{id: deliverymanId}
         });

         if(deliverymanExists){
          await DeliveryMan.update(newData,{
            where:{id:deliverymanId}
          }).catch((error) => { 
            return res.status(500).json({
              msg:"Erro interno no servidor",
              erro: error,
            });
          });
          return res.status(200).json({msg:"Entregador alterado com sucesso."});
        }else{
          return res.status(500).json({msg:"Não foi possível encontrar o entregador."})
        }
  },    
}