const express = require('express');
const router = express.Router();

const homeController = require('../app/controllers/HomeController');

//  homeController

router.get('/chi-tiet/:id',homeController.cht)
router.get('/',homeController.index);

module.exports = router;