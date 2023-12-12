const User = require("../database/models/UserModel")
const encrypt = require("../fragments/security/config-password")
const token = require("../fragments/security/config-token")

module.exports = class UserController {

    static async list(req, res){
        try {
            const users = await User.findAll({ attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
            res.status(200).json(users)
        } catch (error) {
            console.log(error)
        }
        
    }

    static async register(req, res){
        const { name, email, password, confirmpassword } = req.body

        if(!name || !email || !password || !confirmpassword){
            res.status(422).json({message: "Por favor, preencha todos os campos!"})
            return
        }
        if(password != confirmpassword){
            res.status(422).json({message: "A senha e confirmação de senha precisam ser iguais!"})
            return
        }
        // busca por usuario no banco de dados
        const user = await User.findOne({where: {email:email}})

        if(user){
            res.status(422).json({message: "Por favor, utilize outro e-mail"})
            return
        }
        try{
            const hashPassword = await encrypt.hashPassword(password)
            
            await User.create({name, email, password: hashPassword})
            res.status(200).json({message: "Usuário criado com sucesso!"})

        } catch (error) {
            console.log(error) 
        } 
    
    }
    static async login(req, res){
        const { email, password} = req.body

        if(!email){
            res.status(422).json({message: "E-mail obrigatório!"})
            return
        }
        if(!password){
            res.status(422).json({message: "Senha obrigatório!"})
            return
        }
        // busca por usuario no banco de dados
        const user = await User.findOne({where: {email:email}})

        if(!user){
            res.status(422).json({message: "E-mail invalido!"})
            return
        }
        const checkPassword = await encrypt.comparePasswords(password, user.password)
        if(!checkPassword){
            res.status(422).json({message: "Senha Invalida!"})
            return 
        }

        try{
            await token.createUserToken(user, req, res)
            res.status(200).json({message: "Login efetuado com sucesso!"})
        } catch(err){
            console.log(err)
            res.status(400).json({message: "Erro no login!"})
        }
    }
    static async delete(req, res){
        const id = req.params.id
        const {email} = req.body 

        if(!email){
            res.status(422).json({message: "E-mail obrigatório!"})
            return
        }
        // busca por usuario no banco de dados
        const user = await User.findOne({where: {id:id}})

        if(!user){
            res.status(422).json({message: "usuário não existe!"})
            return
        }
        try {
            await User.destroy({where: {id:id}}).then(result => {
                res.status(200).json({message: "Usuário deletado com sucesso!"})
            }).catch(err => console.log(err))
            
        } catch (error) {
            console.log(error)
            res.status(400).json({message: "Não foi possivel deletar o usuário!"})
        }
    }
}
    




