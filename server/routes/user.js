const router = require("express").Router();
const User = require('../controllers/User');
const verify = require('../middleware/verify')


router.post('/signup', User.signup);
router.post("/login", User.login);
router.get('/:username', verify, User.getByUsername);



module.exports = router; 