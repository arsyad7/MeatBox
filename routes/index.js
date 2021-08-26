const router = require('express').Router();
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.get('/', (req, res) => {
    res.render('home')
});

router.use('/users', userRouter);
router.use('/products', productRouter);

module.exports = router;