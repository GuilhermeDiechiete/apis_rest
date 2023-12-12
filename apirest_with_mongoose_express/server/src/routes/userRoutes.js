const router = require('express').Router();
const UserController = require('../controllers/UserControllers');
const token = require('../fragments/token');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/list', UserController.list);
router.post('/user', UserController.getByEmail);
router.delete('/delete/:id', UserController.delete);
router.patch('/edit/:id', UserController.update);
router.patch('/editpass/:id', UserController.editPassword);

module.exports = router;
