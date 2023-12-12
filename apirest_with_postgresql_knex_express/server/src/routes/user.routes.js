const router = require('express').Router();
const UserController = require('../controllers/UserController');
const { verifyToken } = require('../fragments/token');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/list/:id', verifyToken, UserController.list);
router.get('/:id', verifyToken, UserController.user);
router.patch('/:id', verifyToken, UserController.edit);
router.patch('/pass/:id', verifyToken, UserController.editPass);
router.delete('/:id', verifyToken, UserController.delete);

module.exports = router;
