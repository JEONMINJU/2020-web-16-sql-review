const express = require('express');
const app = express();
const path = require('path');
const moment = require('moment');
const { mysql, connection } = require('./modules/mysql-conn');

const bookRouter = require('./routes/book-route');


app.listen(3000, () => { console.log('http://127.0.0.1:3000'); });
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.pretty = true;

app.use(express.json());
app.use(express.urlencoded({ extended: false })); // 포스트 방식 구현 가능 

app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/book', bookRouter);

app.use((req, res) => {
	res.send('/404');
})

