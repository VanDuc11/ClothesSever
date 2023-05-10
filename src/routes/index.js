const homeRouter = require('./home');
const loginRouter = require('./login');
const loginRouter2 = require('./login_copy');
const signupRouter = require('./sigup');
const accountRouter = require('./account');
const productRouter = require('./product');
let bodyparser = require('body-parser');





const route = (app) => {
    app.use(bodyparser.urlencoded({
        extended:true
    }))
    app.use('/',loginRouter);
    app.use('/home', homeRouter);
    app.use('/login',loginRouter2);
    app.use('/signup',signupRouter)
    app.use('/account',accountRouter)
    app.use('/product',productRouter)
  
}

module.exports = route;
