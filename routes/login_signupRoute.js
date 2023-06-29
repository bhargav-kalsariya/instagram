const { Router } = require('express');

let LoginSignupRouter = Router();

LoginSignupRouter.get('/signup', (req, res) => {
    res.send('Welcome')
})

module.exports = { LoginSignupRouter };