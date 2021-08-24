const { Product } = require('../models/index');

class productRouter {
    static list(req, res) {
        const username = req.params.user;
        res.render('products', {username})
    }
}

module.exports = productRouter;