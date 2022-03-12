const {Router} = require('express')
const router = Router()

const users = require('./users')

/**
 * 路由
 */
router.use('/users',users)


module.exports = router
