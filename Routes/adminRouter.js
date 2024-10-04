const express = require('express');
const router = express.Router();
const { adminLogin, listAdmin, updateAdminPassword } = require('../controller/adminController');

router.post('/login', adminLogin);

router.get('/adminList', listAdmin);

//change password
router.patch('/update/:email', updateAdminPassword)

router.get('/', (req, res) => {
    res.render('index'); // Assuming 'index.ejs' is in your views directory
  });
  

module.exports = router;
