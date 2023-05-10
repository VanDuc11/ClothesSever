const express = require('express');
const router = express.Router();

const accountController = require('../app/controllers/AccountController');

//  homeController


router.get('/',accountController.index);
router.get('/listaccount',accountController.show);
router.post('/listaccount/create_data',accountController.create);
router.post('/listaccount/:id/delete',accountController.delete);
router.post('/update',accountController.update);

module.exports = router;