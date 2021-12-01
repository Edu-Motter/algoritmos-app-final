const Delivery = require("../models/Delivery");
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

    async deleteAppointment(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const appointmentId = req.query.id;

        // const deletedAppointment = await Appointment.destroy({
        //     where: {id : appointmentId},
        // }).catch(async (error)=>{
        //     return res.status(500).json({msg:"Erro interno no servidor"});
        // });

        // if(deletedAppointment)
        //     res.status(200).json({msg:"Consulta excluÃ­da com sucesso"});
        // else
        //     res.status(404).json({msg:"Consulta nÃ£o foi encontrada"});
    },

    async listAllDeliveries(req, res){
         
      const deliveries = await Delivery.findAll({
             order: [["description", "ASC"]]
         }).catch((error) => {
             res.status(500).json({
               msg: "Erro interno no servidor", 
               error: error
              });
         });

        if (deliveries){
             res.status(200).json({ deliveries });
        }else{
            res.status(404).json({msg: "Não foi possível encontrar entregas."}); 
        }    
    },

    async findAppointmentByPatientId(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const id = req.query.id;
        // if (!id)
        //     res.status(400).json({
        //         msg:"Id do Paciente nÃ£o foi informado"
        //     });

        // const appointments = await Appointment.findAll({
        //     where : { patientId : id},
        //     include: {
        //         model: Patient,
        //         where: { id : id },
        //         required: true,
        //     }
        // }).catch((error)=> res.status(500).json([{msg:"Erro 500 no servidor"}, {error: error}]));
        
        // if(appointments){
        //     res.status(200).json({appointments});
        // } else res.status(404).json({msg:"nao foi possivel encontar consultas para esse paciente"});
    },

    async findAppointmentByPhysicianId(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const id = req.query.id;
        // if (!id)
        //     res.status(400).json({
        //         msg:"Id do Paciente nÃ£o foi informado"
        //     });

        // const appointments = await Appointment.findAll({
        //     where : { physicianId : id},
        //     include: {
        //         model: Physician,
        //         where: { id : id },
        //         required: true,
        //     }
        // }).catch((error)=> res.status(500).json([{msg:"Erro 500 no servidor"}, {error: error}]));
        
        // if(appointments){
        //     res.status(200).json({appointments});
        // } else res.status(404).json({msg:"nao foi possivel encontar consultas para esse medico"});
    }
}