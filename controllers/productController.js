const { Product, User, UserProduct } = require('../models/index');
const sendEmail = require('../helpers/sendEmail');

class productRouter {
    static list(req, res) {
        const username = req.params.user;

        Product 
            .findAll()
            .then(data => {
                res.render('products', {username, data})
            })
            .catch(err => res.send(err))
        
    }

    static buyProduct(req, res) {
        const id = req.params.id;
        const username = req.params.user;

        let newData = {}

        User
            .findOne({
                where: {
                    username
                }
            })
            .then(data=> {
                newData.UserId = data.id;

                return Product.findByPk(id)
            })
            .then(data => {
                newData.ProductId = data.id;
                newData.totalHarga = data.price;

                return UserProduct.create(newData)
            })
            .then(_ => {
                return Product.decrement('stock', {where: {id: newData.ProductId}})
                
            })
            .then(_ => {
                res.redirect(`/products/${username}`);
            })
            .catch(err => res.send(err))
    }

    static keranjang(req, res) {
        const username = req.params.user;
        let totalPrice = 0;
        let newData = []

        User
            .findOne({
                where: {username},
                include: [Product]
            })
            .then(data => {
                data.Products.forEach(el => {
                    newData.push({
                        id: el.id,
                        name: el.name,
                        price: el.price
                    })
                })

                return UserProduct
                    .findAll({
                        where: {UserId: data.id}
                    })
            })
            .then(data => {
                // res.send(data)
                data.forEach(el => {
                    totalPrice += el.totalHarga;
                });

                // console.log(totalPrice, newData);
                res.render('keranjang', {newData, totalPrice, username})
                // return Product.findByPk(el.ProductId)     
            })
            // .then(data => {
            //     data.forEach(el => {
            //         productList.push(el.name)
            //     })
            //     res.send(data)
            // })
            .catch(err => res.send(err))
    }

    static deleteProduct(req, res) {
        const username = req.params.user;
        const id = req.params.id;

        UserProduct
            .destroy({
                where: {ProductId: id}
            })
            .then(_ => {
                res.redirect(`/products/${username}/keranjang`)
            })
            .catch(err => res.send(err))
    }

    static bayar(req, res) {
        const username = req.params.user;

        User
            .findOne({
                where: {username}
            })
            .then(data => {
                sendEmail(data.email)
            })
            .catch(err => res.send(err))
    }
}

module.exports = productRouter;