const router = require('express').Router();
const productController = require('../controllers/productController');

router.get('/:user', productController.list);

router.get('/:user/buy/:id', productController.buyProduct);

router.get('/:user/keranjang', productController.keranjang);

router.get('/:user/delete/:id', productController.deleteProduct);

router.get('/:user/bayar', productController.bayar);

module.exports = router;