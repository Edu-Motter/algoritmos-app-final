const DeliveryMan = require("../models/DeliveryMan");
const Sequelize = require("sequelize");

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
        return res.status(400).json({msg: "Implementar essa rota"});
        // const {name, email, phone} = req.body;
        // if (!name || !email || !phone){
        //     return res.status(400).json({
        //         msg:"Dados obrigatorio nao foram preenchidos"
        //     });
        // }

        // const patientExists = await Patient.findOne({
        //     where: {email},
        // });
        // if(patientExists)
        //     return res.status(403).json({msg:"Paciente já cadastrado"});
        
        // const patient = await Patient.create({
        //     name, 
        //     email, 
        //     phone,
        // }).catch((error)=>{
        //     return res.status(500).json({msg:"Nao foi possivel inserir dados"});
        // });
        // if (patient)
        //     return res.status(201).json({msg:"Novo paciente adicionado com sucesso"});
        // else 
        //     return res.status(404).json({msg:"Nao foi possivel cadastrar novo paciente"});  
    },

    async searchDeliveryManByName(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const name = req.query.name;
        // if (!name)
        //     return res.status(400).json({
        //         msg:"parametro obrigatorio vazio",
        //     });
        // const Op = Sequelize.Op;
        // const patients = await Patient.findAll({
        //     where: {name: { [Op.like]: "%" + name + "%" } },
        // });
        
        // if (patients) {
        //     if (patients == "")
        //         return res.status(404).json({msg:"Nao ha pacientes com esse nome"});
        //     else return res.status(200).json({patients});
        // } else return res.status(404).json({msg:"nao foi possivel encontrar o paciente"});
    },

    async searchDeliveryMenByAssociate (req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const id = req.query.id;
        // if (!id)
        //     return res.status(400).json({
        //         msg:"Id do médico não foi informado"
        //     });       

        // const patients = await Patient.findAll({
        //     include: {
        //         model: Appointment,
        //         where: { physicianId : id },
        //         required: true,
        //     }
        // }).catch(async (error) => {
        //     return res.status(500).json({msg:"Erro interno no servidor"});
        // });

        // if(patients.length > 0) 
        //     return res.status(200).json({patients});            
        // else 
        //     return res.status(404).json({msg:"Esse médico ainda não possui pacientes"});  
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