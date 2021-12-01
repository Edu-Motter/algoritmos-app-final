const Client = require("../models/Client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Delivery = require("../models/Delivery");


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
    async listAllClients(req, res){
        const clients = await Client.findAll({
            order: [["companyName", "ASC"]]
        }).catch((error) => {
            return res.status(500).json({msg: "Falha na conex„o.", error: error});
        });

        if (clients) 
            return res.status(200).json({ clients });
        else 
            return res.status(404).json({msg: "N„o foi possivel encontrar clientes."});
    },

    async searchClientByCnpj(req, res){
        const cnpj = req.query.cnpj;
        if (!cnpj)
            return res.status(400).json({
                msg:"Par‚metro obrigatÛrio vazio",
            });

        const clients = await Client.findOne({
            where: {cnpj: cnpj},
        });
        
        if (clients) {
            return res.status(200).json({clients});
        }else{ 
            return res.status(404).json({msg:"N„o h· cliente com esse cnpj"});
        }
    },

    async searchClientById(req, res){
      const id = req.query.id;
       
      if (!id){
          return res.status(400).json({
              msg:"Par‚metro obrigatÛrio vazio",
          });
      }
      const clients = await Client.findOne({
          where: {id: id},
      });
      
      if (clients) {
          return res.status(200).json({clients});
      }else{ 
          return res.status(404).json({msg:"N„o h· cliente com esse cnpj"});
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
          return res.status(200).json({msg:"Cliente excluÌdo com sucesso"});
        }
        else{ 
          return res.status(404).json({msg:"Cliente n„o encontrado"});
        }
    },

    async updateClient(req, res){
      const clientId = req.body.id;

      const newData = req.body.data;

      if(!clientId){
        return res.status(400).json({
          msg:"ID do entregador n„o inserido"
        });
      }
      if (!newData.companyName || !newData.cnpj || !newData.address || !newData.associateId){
           return res.status(400).json({
              msg:"Dados obrigatÛrios n„o foram preenchidos"
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
        return res.status(500).json({msg:"N„o foi possÌvel encontrar o cliente."})
      }
    },

    async newClient(req, res){

        const {companyName, cnpj, address, associateId} = req.body;
        if(!companyName || !cnpj || !address || !associateId){
            return res.status(400).json({
                msg: "Dados obrigatÛrios n„o foram preenchidos"
            });
        }

        const isClientNew = await Client.findOne({
            where:{cnpj},
        });

        if (isClientNew){
            return res.status(403).json({
              msg:"Cliente ja foi cadastrado"
            });
        }else {
            const client = await Client.create({
                cnpj,  
                associateId,
                companyName, 
                address,
            }).catch((error)=>{
              return res.status(500).json({
                msg:"N„o foi possÌvel inserir os dados",
                error:error,
              });
            });
            if(client){
              return res.status(201).json({msg:"Novo cliente foi adicionado"});
            }else{ 
              return res.status(404).json({msg:"N„o foi possivel cadastrar novo cliente"});
            }
        }
    },

    async authentication(req, res){
        return res.status(400).json({msg: "Implementar essa rota"});
        // const email = req.body.email;
        // const password = req.body.password;
        // if (!email || !password){
        //     res.status(400).json({ msg :  "Email e Password s√£o obrigat√≥rios" });
        // }

        //  try {
        //     const physician = await Physician.findOne({
        //         where: { email },
        //     });

        //     if (!physician){
        //         return  res.status(404).json({msg:"Usu√°rio ou Senha inv√°lidos."})
        //     } else {
        //         if (bcrypt.compareSync(password, physician.password)){
        //             const token = generateToken(physician.id);
        //             return res.status(200).json({msg : "Autenticado com sucesso.", token : token});
        //         } else {
        //             return res.status(404).json({msg: "Usu√°rio ou Senha inv√°lidos A."});
        //         }
        //     }
        //  } catch(error){
        //      return res.status(500).json({ msg : "Erro interno no servidor", error: error });
        //  }
    }
}