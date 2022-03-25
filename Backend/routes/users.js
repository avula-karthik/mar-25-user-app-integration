var express = require('express');
var router = express.Router();
var connector = require('../connect');
router.get('/createtable', (req, res) => {
    connector.query(
        'CREATE TABLE user ( email varchar(100), password varchar(100), userinfo varchar(500), dob date)',
        function (err, results, fields) {
            res.json({ err, results, fields });
        }
    );
});
router.get('/', function (req, res) {
    const sql = `select * from user`;
    connector.query(sql, function (err, results, fields) {
        res.json({ results });
    });
});
router.post('/', function (req, res) {
    const { email, password, userinfo, dob } = req.body;
    const sql = `INSERT INTO user VALUES ("${email}","${password}", "${userinfo}", "${dob}")`;
    connector.query(sql, (err, results, fields) => {
        res.json({ err, results, fields });
    });
});
router.delete('/:email', function (req, res) {
    let email = req.params.email;
    const sql = `DELETE FROM user WHERE email = "${email}" `;
    connector.query(sql, (err, results, fields) => {
        res.json({ err, results, fields });
    });
});
router.get('/deleteall', function (req, res) {
    const sql = `DELETE FROM user`;
    connector.query(sql, function (err, results, fields) {
        res.json({ results });
    });
});
router.put('/:email', function (req, res) {
    const { email, password, userinfo, dob } = req.body;
    const sql = `UPDATE user set email = "${email}",password = "${password}", userinfo="${userinfo}", dob="${dob}" where email="${email}" `;
    connector.query(sql, function (err, results, fields) {
        res.json({ results });
    });

    connector.query(sql);
});
module.exports = router;
