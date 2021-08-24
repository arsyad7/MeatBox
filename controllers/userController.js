const { User } = require('../models/index');

class userController {
    // Register
    static registerForm(req, res) {
        res.render('register');
    }

    static register(req, res) {
        let data = {
            name: req.body.name,
            username: req.body.username,
            phone_number: req.body.phone_number,
            password: req.body.password,
            alamat: req.body.alamat
        };

        User
            .create(data)
            .then(_ => {
                res.redirect('/');
            })
            .catch(err => {
                res.send(err);
            })
    }

    static loginForm(req, res) {
        res.render('login')
    }

    static login(req, res) {
        let data = {
            username: req.body.username,
            password: req.body.password,
        };

        User.findOne({
            where: {
                username: data.username
            }
        })
        .then(result => {
            if (result.password === data.password) {
                res.redirect(`/products/${data.username}`)
            } else {
                res.send('password salah')
            }
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = userController;