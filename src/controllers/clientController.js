const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
    async listAllPhysicians(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const physicians = await Physician.findAll({
        //     order: [["name", "ASC"]]
        // }).catch((error) => {
        //     res.status(500).json({msg: "Falha na conexão.", error: error});
        // });

        // if (physicians) 
        //     res.status(200).json({ physicians });
        // else 
        //     res.status(404).json({msg: "Não foi possivel encontrar medicos."});
    },

    async deletePhysician(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const physicianId = req.query.id;
        // const deletedPhysician = await Physician.destroy({
        //     where: {id:physicianId},
        // }).catch(async (error)=>{
        //     const physicianHasRef = await Appointment.findOne({
        //         where:{physicianId: physicianId},
        //     }).catch((error)=>{
        //         res.status(500).json({msg:"falha na conexao"});
        //     });
        //     if(physicianHasRef)
        //     return res.status(403).json({msg:"medico possui consultas em seu nome"});
        // });
        // if(deletedPhysician !== 0)
        //     res.status(200).json({msg:"medico excluido com sucesso"});
        // else res.status(404).json({msg:"medico nao encontrado"});
    },

    async updatePhysician(req, res){
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

    async newPhysician(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const {name, email, password} = req.body;
        // if(!name || !email || !password){
        //     res
        //     .status(400)
        //     .json({
        //         msg: "Dados obrigatorios nao foram preenchidos"
        //     });
        // }

        // const passwordValid = passwordValidation(password);
        // if(passwordValid !== "OK"){
        //     return res.status(400).json({msg: passwordValid});
        // }

        // const isPhysicianNew = await Physician.findOne({
        //     where:{email},
        // });       

        // if (isPhysicianNew)
        //     return res.status(403).json({msg:"Medico ja foi cadastrado"});
        // else {

        //     const salt = bcrypt.genSaltSync(12);
        //     const hash = bcrypt.hashSync(password, salt);

        //     const physician = await Physician.create({
        //         name, 
        //         email, 
        //         password : hash,
        //     }).catch((error)=>{
        //         res.status(500).json({msg:"Nao foi possivel inserir os dados"});
        //     });
        //     if(physician)
        //         res.status(201).json({msg:"Novo medico foi adicionado"});
        //     else    
        //         res.status(404).json({msg:"nao foi possivel cadastrar novo paciente"});
        // }
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