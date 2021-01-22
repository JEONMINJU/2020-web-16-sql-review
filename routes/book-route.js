const express = require('express');
const router = express.Router();
const { connection } = require('../modules/mysql-conn');
const numeral = require('numeral');

// 도시 리스트
router.get('/', (req, res) => {
	const sql = 'SELECT * FROM books ORDER BY name ASC';
	const onQuery = (err, r) => {
		for(let v of r) {
			v.population = numeral(v.population).format('0,0')+'명';
		}
		res.render('book/list', { file: 'book', data: r });
	}
	connection.query(sql, onQuery);
});


module.exports = router;