const Delivery = require("../models/Delivery");
const DeliveryMan = require("../models/DeliveryMan");
const Client = require("../models/Client");


module.exports = {

    async newDelivery(req, res){
      const {description, clientId, deliveryManId} = req.body;
        
        if (!description || !clientId || !deliveryManId ){
             return res.status(403).json({
                 error : "Dados obrigatórios não foram preenchidos"
             });   
         }

      const client = await Client.findOne({
        where:{id: clientId}
      }).catch((error) => {
        return res.status(404).json({
          msg:"Cliente não encontrado!",
          error:error,
        });
      });

      if(!client){
        return res.status(404).json({
          msg:"Cliente não encontrado!",
        });
      }
      const deliveryman = await DeliveryMan.findOne({
        where:{id: deliveryManId}
      }).catch((error) => {
        return res.status(404).json({
          msg:"Deliveryman não encontrado!",
          error:error,
        });
      });

      if(!deliveryman){
          return res.status(404).json({
            msg:"Entregador não encontrado!",
          });
      }
      if(deliveryman.associateId != client.associateId){
        return res.status(400).json({
          msg:"Este Deliveryman não pertence ao associado informado."
        });
      }

      if(client){
        const delivery = await Delivery.create({
          description,
          clientId,
          deliveryManId,
          associateId: client.associateId,
          delivered: false,
          value: 0.0,
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error:error,
          });
        })
        
        if(delivery){
          return res.status(200).json({
            msg:"Nova entrega cadastrada com sucesso!"
          });
        }else{
          return res.status(500).json({
            msg:"Erro ao cadastrar nova entrega"
          });
        }
      }
    },

    async deleteDelivery(req, res){
        const deliveryId = req.query.id;

        const delivery = await Delivery.findOne({
            where:{id: deliveryId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor.",
            error:error,
          });
        });

        if(delivery){
            if(delivery.delivered){
              return res.status(400).json({
                msg:"Entrega já concluída, não é possível excluir"
              });
            }else{
              const deletedDelivery = await Delivery.destroy({
                where:{id: deliveryId}
              }).catch((error) => {
                return res.status(500).json({
                  msg:"Erro interno no servidor ao excluir.",
                  error:error,
                });
              });

              if(deletedDelivery){
                return res.status(200).json({
                  msg:"Entrega excluída com sucesso!"
                });
              }else{
                return res.status(400).json({
                  msg:"Houve um erro ao tentar excluir a entrega"
                });
              }
            }
        }else{
          return res.status(404).json({
            msg:"Entrega não encontrada"
          })
        }
    },

    async updateDelivery(req,res){
      const deliveryId = req.body.id;
      const newData = req.body;

      const delivery = await Delivery.findOne({
        where:{id: deliveryId}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servidor.",
          error:error,
        });
      });

      if(!delivery){
        return res.status(404).json({
          msg:"Entrega não encontrada!",
        });
      }

      if(req.body.deliveryManId){
        const deliveryman = await DeliveryMan.findOne({
          where:{id: req.body.deliveryManId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno do servidor.",
            error:error,
          });
        });
        if(!deliveryman){
          return res.status(404).json({
            msg:"Entregador não encontrado!",
          });
        }else{
          if(delivery.associateId != deliveryman.associateId){
            return res.status(422).json({
              msg:"Este entregador não pertence ao associado do pedido."
            });
          }
        }
      }

      if(req.body.clientId){
        const client = await Client.findOne({
          where:{id: req.body.clientId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error:error,
          });
        });

        if(!client){
          return res.status(404).json({
            msg:"Cliente não encontrado!",
          });
        }else{
          if(client.associateId != delivery.associateId){
            return res.status(422).json({
              msg:"Este cliente não pertence ao associado do pedido."
            });
          }
        }
      }

      if(delivery){
        if(delivery.delivered){
          return res.status(400).json({
            msg:"Entrega já concluída, não é possível alterar"
          });
        }
        const updatedDelivery = await Delivery.update(newData,{
          where:{id:deliveryId}
        }).catch((error) => {
          return res.status(500).json({
            msg:"Erro interno no servidor",
            error:error,
          });
        });
        if(updatedDelivery){
          return res.status(200).json({
            msg:"Entrega alterada com sucesso!",
          });
        }else{
          return res.status(400).json({
            msg:"Houve um erro ao tentar alterar a entrega"
          });
        }
      }else{
        return res.status(404).json({
          msg:"Entrega não encontrada"
        });
      }
    },

    async listAllDeliveries(req, res){
         
      const deliveries = await Delivery.findAll({
             order: [["description", "ASC"]]
         }).catch((error) => {
            return res.status(500).json({
               msg: "Erro interno no servidor", 
               error: error
              });
         });

        if (deliveries){
          return res.status(200).json({ deliveries });
        }else{
          return res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
        }    
    },

    async listAllDelivered(req,res){
      const deliveries = await Delivery.findAll({
        where:{delivered: true}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
      }    
    },

    async listAllPending(req,res){
      const deliveries = await Delivery.findAll({
        where:{delivered: false}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
      }    
    },

    async listAllByDeliveryman(req,res){
      const deliverymanId = req.query.id;

      const deliveries = await Delivery.findAll({
        where:{deliveryManId: deliverymanId}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
      }    
    },

    async listAllDeliveredByDeliveryman(req,res){
      const deliverymanId = req.entityId;

      const deliveries = await Delivery.findAll({
        where:{delivered: true, deliveryManId: deliverymanId}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
      }    
    },

    async listAllPendingByDeliveryman(req,res){
      const deliverymanId = req.entityId;

      const deliveries = await Delivery.findAll({
        where:{delivered: false, deliveryManId:deliverymanId}
      }).catch((error) => {
       return res.status(500).json({
          msg: "Erro interno no servidor", 
          error: error
         });
      });

      if (deliveries){
        return res.status(200).json({ deliveries });
      }else{
        return res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
      }    
    },

    async endDelivery(req,res){
      const deliveryId = req.body.id;
      const price = req.body.price;
      const deliverymantokenid = req.entityId;
 

      const delivery = await Delivery.findOne({
        where:{id: deliveryId}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servidor."
        });
      });

      if(!delivery){
        return res.status(404).json({
          msg:"Entrega não encontrada!",
          error:error,
        });
      }

      const deliverymanId = delivery.deliveryManId;

      if(deliverymantokenid != deliverymanId){
        return res.status(405).json({
          msg: "Não autorizado."
        });
      }

      delivery.value = price;
      delivery.delivered = true;
      delivery.deliveredAt = Date.now();

      console.log(delivery);

      const updatedDelivery = await Delivery.update(delivery,{
        where:{id:delivery.id}
      }).catch((error) => {
        return res.status(500).json({
          msg:"Erro interno no servidor",
          error:error,
        });
      });
      
      if(updatedDelivery){
        return res.status(200).json({
          msg: "Entrega finalizada com sucesso!"
        });
      }
    }
}