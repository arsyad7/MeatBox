const router = require('express').Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const isLogin = require('../middlewares/checkLogin');

router.get('/', (req, res) => {
    res.render('home')
});

router.use('/users', userRouter);

router.use('/products', isLogin, productRouter);

module.exports = router;