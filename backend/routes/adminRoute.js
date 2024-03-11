const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
        const { username, password } =  req.body;
        const adminName =  process.env.ADMIN_LOGIN;
        const adminPassword =  process.env.ADMIN_PRAOL
        if (adminName === username && password === adminPassword) {
            res.status(200).json({ msg: 'success',username:adminName,password:adminPassword })
        }else{
            res.status(500).json({ msg: 'error' })
        }
});

module.exports = router;