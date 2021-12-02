const DeliveryMan = require("../models/DeliveryMan");
const Sequelize = require("sequelize");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


function generateToken(id){

  process.env.JWT_SECRET = Math.random().toString(36).slice(-20);

    const token = jwt.sign({ id, isAssociate: false }, process.env.JWT_SECRET, 
        {expiresIn : 18000} //24hrs
    );

  return token;
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
        const deliverymanExists = await DeliveryMan.findOne({
             where: {cpf},
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            erro: error,
         });
        });
      
        if (deliverymanExists) {
          return res.status(403).json({msg:"Deliveryman j� cadastrado"});
        } else {
         
          const salt = bcrypt.genSaltSync(12);
          const hash = bcrypt.hashSync(password, salt);

          const d = await DeliveryMan.create({
            associateId,
            name,
            cpf,
            password: hash,
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
          where:{id: id},
          
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
             where:{associateId: id},
             
         }).catch(async (error) => {
             return res.status(500).json({msg:"Erro interno no servidor"});
         });

         if(deliverymen.length > 0) 
             return res.status(200).json({deliverymen});            
         else 
             return res.status(404).json({msg:"N�o foi poss�vel encontrar nenhum entregador para esse associado "});  
    },
    
  async updateDeliveryMan(req, res){
    
        const deliverymanId = req.body.id;

        const newData = req.body;

        if(!deliverymanId){
          return res.status(400).json({
            msg:"ID do entregador n�o inserido"
          });
        }
        if (!newData.name || !newData.cpf || !newData.password || !newData.phone || !newData.associateId){
             return res.status(400).json({
                msg:"Dados obrigat�rios n�o foram preenchidos"
            });
        }
        if(newData.cpf.length != 11){
            return res.status(400).json({
              msg:"CPF inv�lido"
          });
        }
        if(!passwordValidation(newData.password)){
           return res.status(400).json({
             msg:"Senha Inv�lida! A senha deve conter 8 caracteres, no m�nimo 1 letra e 1 n�mero!"
           })
        }

        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(newData.password, salt);
      
        newData.password = hash;

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
          return res.status(500).json({msg:"N�o foi poss�vel encontrar o entregador."})
        }
  },    

  async deleteDeliveryman(req,res){
    const deliverymanId = req.query.id;

    
    const deletedDeliveryman = await DeliveryMan.destroy({
        where: {id : deliverymanId},
    }).catch(async (error)=>{
        return res.status(500).json({
          msg:"Erro interno ao excluir o entregador",
          error:error,
        });
    });

    if(deletedDeliveryman){
        res.status(200).json({msg:"Entregador exclu�do com sucesso!"});
    }else{
        res.status(404).json({msg:"Entregador n�o encontrado"});
    }
  },

  async authentication(req, res){
    //!todo: Reescrever: somente fiz copia para nao esquecermos!!!

    const cpf = req.body.cpf;
    const password = req.body.password;
    if (!cpf || !password){
        res.status(400).json({ msg :  "CNPJ e Password são obrigatórios" });
    }

     try {
        const deliveryman = await DeliveryMan.findOne({
            where: { cpf },
        });

        if (!deliveryman){
            return  res.status(404).json({msg:"Usuário ou Senha inválidos."})
        } else {
            if (bcrypt.compareSync(password, deliveryman.password)){
                const token = generateToken(deliveryman.id);
                if(token){
                  return res.status(200).json({msg : "Autenticado com sucesso.", token : token});
                }
            } else {
                return res.status(405).json({msg: "Usuário ou Senha inválidos A."});
            }
        }
     } catch(error){
         return res.status(500).json({ msg : "Erro interno do servidor", error: error });
     }
  }
}