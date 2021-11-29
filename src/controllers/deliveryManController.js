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
        return res.status(500).json({msg: "Falha na conex�o.", error: error});
      });

      if (deliveryMen) 
        return res.status(200).json({ deliveryMen });
      else 
        return res.status(404).json({msg: "N�o foi possivel encontrar clientes."});
    },

    async newDeliveryMan(req, res){
        const {associateId, name, cpf, password, phone} = req.body;
         if (!name || !cpf || !password || !phone || !associateId){
             res.status(400).json({
                msg:"Dados obrigat�rios n�o foram preenchidos"
            });
         }
         if(cpf.length != 14){
            res.status(400).json({
              msg:"CPF inv�lido"
          });
         }
         if(!passwordValidation(password)){
            res.status(400).json({
              msg:"Senha Inv�lida! A senha deve conter 8 caracteres, no m�nimo 1 letra e 1 n�mero!"
            })
         }

         const deliverymanExists = await DeliveryMan.findOne({
             where: {cpf},
         });

         if(deliverymanExists){
            res.status(403).json({msg:"Deliveryman j� cadastrado"});
         }else{
            const d = await DeliveryMan.create({
              associateId,
              name,
              CPF:cpf,
              password,
              phone,

            }).catch((error) => {
               res.status(500).json({msg:"Erro interno no servidor",
                erro: error,
              });
            });
            
            res.status(201).json({msg:"Novo entregador adicionado com sucesso"});
            
          }

    },

    async searchDeliveryManByCpf(req, res){
        const cpf = req.query.cpf;
        if (!cpf)
            return res.status(400).json({
                msg:"CPF do entregador n�o informado"
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
            return res.status(404).json({msg:"N�o foi poss�vel encontrar nenhum entregador com esse cpf "}); 
    },

    async searchDeliveryManById(req, res){
      const id = req.query.id;
      if (!id)
          return res.status(400).json({
              msg:"ID do entregador n�o informado"
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
          return res.status(404).json({msg:"N�o foi poss�vel encontrar nenhum entregador com esse id "}); 
  },

    async searchDeliveryMenByAssociate(req, res){
         const id = req.query.id;
         if (!id)
             return res.status(400).json({
                 msg:"Id do associado n�o foi informado"
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
             return res.status(404).json({msg:"N�o foi poss�vel encontrar nenhum entregador para esse associado "});  
    },
    
    async updateDeliveryMan(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const patientId = req.body.id;
        // const patient = req.body;
        // if (!patientId) res.status(400).json({msg:"ID do paciente vazio"});
        // else {
        //     const patientExists = await Patient.findByPk(patientId);
        //     if (!patientExists)
        //         return res.status(404).json({msg:"paciente nao encontrado"});
        //     else {
        //         if (patient.name || patient.email){
        //             await Patient.update(patient,{
        //                 where : {id:patientId}
        //             });
        //             return res.status(200).json({msg:"paciente atualizdo com sucesso"});
        //         } else return res.status(400).json({msg:"campos obrigatorios nao preenchidos"});
        //     }
        // }
    }
    
}