const User = require('../models/user');



class LoginController {

    index(req, res) {

        res.render('login', { layout: 'temple_login' });
    }
    login(req, res, next) {
        let user = req.body.username;
        let pass = req.body.password;
        // lấy dữ liệu từ server
        User.findOne({ name: user, password: pass })
            .then((result) => {
                if (result) {
                    req.session.user = {result};
                    console.log(req.session.user);
                    // Nếu tìm thấy user và password trong cơ sở dữ liệu
                    res.redirect('/home');
                } else {
                    // Nếu không tìm thấy user và password trong cơ sở dữ liệu
                    res.render('login', { layout: 'temple_login' });
                    res.send('<script>alert("Thông tin không chính xác!"); window.location.href="/";</script>');
                }
            })
            .catch((err) => next(err));
        
    };

    async sigup(req, res) {

        const user = new User(req.body);
        try {
            await user.save();
        } catch (error) {
            res.status(500).send(err)
        }

        console.log(user);


        res.render('home');




    }
}

module.exports = new LoginController;