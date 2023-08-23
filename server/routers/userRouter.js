const router = require("express").Router()
const { userController } = require('../controllers')
const auth = require('../middleware/auth')


router.get('/:id', auth, userController.getUserDetail)
router.post('/register', auth, userController.register)
router.patch('/verify', auth, userController.verifyEmail)

module.exports = router