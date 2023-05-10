const User = require('../models/user');
class AccountController {
    index(req, res) {
        if (!req.session.user) {
            res.redirect('/');
            return;
        }

        // Lấy thông tin người dùng từ session
        const user = req.session.user;

        res.render('account', { user });
    }
    async show(req, res, next) {
        await User.find({})
            .then((user) => {
                res.render('listaccount', {

                    user: user.map(res => res.toJSON())
                });
            }).catch(next)
    }



    async update(req, res, next) {


        const document = await User.findById(req.body.id);

        let id = req.body.id;
        let oldPassword = req.body.oldPassword;
        let newPassword = req.body.newPassword;
        let confirmPassword = req.body.confirmPassword;
        if (document.password == oldPassword && newPassword == confirmPassword && oldPassword != confirmPassword) {
            await User.updateOne({ _id: id },
                {
                    $set: {
                        password: confirmPassword
                    }
                });
            res.send(`<script>alert("Đổi mật khẩu thành công!"); window.location.href="/account";</script>`);

        } else {
            res.send(`<script>alert("Thông tin không chính xác!"); window.location.href="/account";</script>`);

        }

    }

    //GET [] /:ID/EDIT
    async delete(rep, res, next) {
        const id = rep.params.id;

        try {
            const document = await User.findById(id);
            User.deleteOne({ _id: document._id })
                .then((result) => {
                    console.log(`Deleted ${result.deletedCount}`);
                    res.status(200).json({ message: 'User removed successfully' });
                })
            console.log(document._id);

        } catch (error) {
            console.log(error);

        }

    }
    async create(req, res, next) {
        var email = req.body.email;
        var name = req.body.name;
        var password = req.body.Password;
        var resPassword = req.body.resPassword;

        const user = new User({
            name: name,
            email: email,
            password: resPassword
        });
        console.log(req.body);
        if (resPassword === password) {
            const edit = req.body.id;
            try {
                if (!edit) {
                // thêm

                    await user.save()
                    res.send('<script>alert("Thêm tài khoản thành công!"); window.location.href="/account/listaccount";</script>');
                    console.log("Thêm thành công");
                }else{
                    
                    //update
                await User.updateOne({ _id: edit },
                    {
                        $set: {
                            name: req.body.name,
                            email: req.body.email,
                            password: req.body.resPassword,
                        }
                    });
                res.send(`<script>alert("Update tài khoản thành công: ${edit}"); window.location.href="/account/listaccount";</script>`);

                }
            } catch (error) {

            }



        } else {
            res.send('<script>alert("Mật khẩu không khớp"); window.location.href="/account/listaccount";</script>');

        }

    }

}

module.exports = new AccountController;