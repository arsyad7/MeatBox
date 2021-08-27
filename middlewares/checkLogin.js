function isLogin(req, res, next){
    if(req.session.isLogin){
        next()
    } else {
        res.redirect(`/users/login`)
    }
}

module.exports = isLogin