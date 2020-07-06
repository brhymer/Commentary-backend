const router = require('express').Router()
const ctrl = require('../controllers')

router.get('/', ctrl.posts.index)
router.post('/', ctrl.posts.create)
router.put('/:id', ctrl.posts.update)
router.delete('/:id', ctrl.posts.destroy)

module.exports = router