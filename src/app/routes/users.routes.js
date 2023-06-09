const express = require('express');
const router = express.Router();

const middlewares = require('../middlewares/auth');

const controller = require('../controllers/user-controller');


router.get('/', middlewares.isAdmin, controller.get);
router.get('/:id', middlewares.verifyToken, controller.getById);
router.get('/userkey/:key', middlewares.isAdminTeam, controller.getUsersKey);


router.post('/', controller.post);

router.put('/:id', middlewares.verifyToken, controller.put);
router.put('/updatepass/:id', middlewares.verifyToken, controller.updatePassword);

router.delete('/:id', middlewares.verifyToken, controller.delete);
router.delete('/img/:id', middlewares.verifyToken, controller.deleteImg);


module.exports = router;