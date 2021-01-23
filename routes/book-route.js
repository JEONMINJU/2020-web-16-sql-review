const express = require('express');
const router = express.Router();
const { connection } = require('../modules/mysql-conn');
const moment = require('moment');

// 도서 리스트
router.get('/', (req, res) => {
	const sql = 'SELECT * FROM books ORDER BY name ASC';
	//const date =moment().format('YYYY년 MM월 DD일');
	const onQuery = (err, r) => {
		for(let v of r) {
			v.wdate = moment(v.wdate).format('YYYY년 MM월 DD일');
		}
		res.render('book/list', { file: 'book', data: r });
	}
	connection.query(sql, onQuery);
});

// 도서 등록
router.get('/create', (req, res) => {
	res.render('book/create', { file: 'book' });
});

// 도서 등록(저장)
router.post('/save', (req, res) => {
	//console.log(req.body);
	//res.json(req.body);

	const { name, writer, wdate } = req.body;
	const sql = "INSERT INTO books SET name=?,writer=?,wdate=?";
	const value = [name, writer, wdate];
	const onQuery = (err, r) => {
		res.redirect('/book');
	}
	connection.query(sql, value, onQuery);
	
});

// 도서 삭제
router.get('/remove/:id', (req, res) => {
	const sql = 'DELETE FROM books WHERE id='+req.params.id;
	const onQuery = (err, r) => {
		res.redirect('/book');
	}
	connection.query(sql, onQuery);
});
// :id 는 가변주소를 받을 때 쓴다.이때는 쿼리가 아닌 params로 받는다.(시멘틱주소체계)

// 도서 수정 (get)
router.get('/update/:id', (req, res) => {
	const sql = 'SELECT * FROM books WHERE id='+req.params.id;
	const onQuery = (err, r) => {
		//res.json(r);
		res.render('book/update', {file:'book', r : r[0]});
	} //받은 데이터를 퍼그한테 보낸다.
	connection.query(sql, onQuery);
});
// 도서 수정 (post)
router.post('/update', (req, res) => {
  // id 도 넣어주기 (퍼그에서 안보이게 심어놨으니깐.)
	const { name, writer, wdate, id } = req.body;
	const sql = 'UPDATE books SET name=?,writer=?,wdate=? WHERE id=?';
	const value = [name, writer, wdate, id];
	const onQuery = (err, r) => {
		res.redirect('/book');
	}
	connection.query(sql, value, onQuery);
})




module.exports = router;