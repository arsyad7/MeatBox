const { User } = require('../models/index');
const { checkPass } = require('../helpers/hashPass');

class userController {
    // Register
    static registerForm(req, res) {
        let errors = [];

        if (req.query.error) {
            errors = req.query.error.split(',');
            res.render('register', {errors});
        } else {
            res.render('register', {errors});

        }
    }

    static register(req, res) {
        let data = {
            name: req.body.name,
            username: req.body.username,
            phone_number: req.body.phone_number,
            password: req.body.password,
            alamat: req.body.alamat,
            email: req.body.email
        };

        User
            .create(data)
            .then(_ => {
                res.redirect('/users/login');
            })
            .catch(err => {
                let errors = [];

                err.errors.forEach(el => {
                    errors.push(el.message);
                });
                res.redirect(`/users/register?error=${errors}`);
            })
    }

    // Login
    static loginForm(req, res) {
        let error = req.query.error;

        res.render('login', {error});
    }

    static login(req, res) {
        let data = {
            username: req.body.username,
            password: req.body.password,
        };

        if (req.body.username === '') {
            res.redirect('/users/login?error=Username tidak terdaftar');
        } else {
            User
                .findOne({
                    where: {
                        username: data.username
                    }
                })
                .then(result => {
                    if(checkPass(data.password, result.password)) {
                        res.redirect(`/products/${data.username}`);
                    } else {
                        res.redirect('/users/login?error=Password salah');
                    }
                })
                .catch(err => {
                    res.redirect('/users/login?error=Username atau Password salah');
                })
        }
    }
}

module.exports = userController;