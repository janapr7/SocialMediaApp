const router = require("express").Router()
const { userController } = require('../controllers')
const auth = require('../middleware/auth')


router.get('/:id', auth, userController.getUserDetail)

module.exports = router