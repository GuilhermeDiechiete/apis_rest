const jwt = require("jsonwebtoken")

exports.createUserToken = async(user, req, res) => {

    const token = jwt.sign({ name: user.name, id: user.id },
        process.env.JWT_SECRET, // segredo apenas da aplicação 
        {expiresIn:"2h"}) // tempo do token

    if(!token){
        res.status(400).json({message: "Falha ao gerar Token!"})
        return
  }
  console.log(token)
}

// Função para pegar o token
exports.getUserToken = (req) => {
    const authHeader = req.headers["authorization"] // pegar o token que vem na req
    const token = authHeader && authHeader.split(" ")[1] // retira o "Bearer" que vem na frente
    return token // retorna somente o token
}

exports.verifyToken = (req, res, next) => {
  const token = this.getUserToken(req) // pegando o token da req
  if(!token){ 
      res.status(401).json({ message: "Token não fornecido!"})
      return 
  }
  const id = req.params.id 
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      // comparando se o id do usuario que está no token é igual ao id do usuario da req.
      if(decoded.id != id){
          res.status(401).json({message:"Token invalido para esté usuário"})
          return
      }
      req.user = decoded
      next()
  } catch(err){
      res.status(400).json({ message: "O Token é inválido!" });
  }
}
