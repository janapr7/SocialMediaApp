const router = require("express").Router()
const { postController } = require('../controllers')
const auth = require('../middleware/auth')


router.get('/', auth, postController.getPost)
router.get('/:id', auth, postController.getPostDetail)

module.exports = router