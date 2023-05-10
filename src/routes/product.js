const express = require('express');
const router = express.Router();

const productController = require('../app/controllers/ProductController');

//  homeController
var multer = require('multer');
var storage = multer.diskStorage({
    destination: (rep, file, cb) => {
        cb(null, 'src/public/images');
    },
    filename: (rep, file, cb) => {
        cb(null, file.originalname);
    }
});


const upload = multer({ storage: storage });


router.post('/create_data',upload.single('image'),productController.create_data);
router.post('/:id/delete',productController.delete);
router.get('/:slug',productController.show);
router.get('/',productController.index);

module.exports = router;