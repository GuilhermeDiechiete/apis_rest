const jwt = require('jsonwebtoken');

exports.createUserToken = async (user) => {
  const token = jwt.sign(
    {
      id: user.id, name: user.name, email: user.email, age: user.age, phone: user.phone,
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' },
  );

  if (!token) {
    return null;
  }
  return token;
};

exports.getUserToken = (req) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  return token;
};

exports.verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  const { id } = req.params;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido!' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.id !== Number(id)) {
      res.status(401).json({ message: 'Token invalido para esté usuário' });
      return;
    }
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: 'O Token é inválido, faça login novamente!' });
  }
};
