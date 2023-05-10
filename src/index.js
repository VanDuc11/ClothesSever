// cấu hình express
let express = require('express');
let app = express();
//============
const route = require('./routes');
// cấu hình handlebar
let expressHbs = require('express-handlebars');
let path = require('path');
const { text } = require('express');
const session = require('express-session');
const db = require('./db');

// Connect DB
db.connect();

app.use(session({
    secret: 'my-secret-key', // chuỗi bí mật được sử dụng để mã hóa phiên
    resave: false,
    saveUninitialized: true
  }));




app.engine('.hbs', expressHbs.engine({
    extname: '.hbs'
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname,'resources', 'views'));

//đọc file css
app.use(express.static(__dirname, {type:'text/css'}))
app.use(express.static(path.join(__dirname, 'public')));// trỏ tới thư mục chứa ảnh


// route init
route(app);





app.listen(9999);