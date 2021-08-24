const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/:user', productController.list)

module.exports = router;