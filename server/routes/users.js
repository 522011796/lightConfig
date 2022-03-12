const { Router } = require('express')
const router = Router()

// Mock Users
const users = [
  { name: 'Alexandre' },
  { name: 'Pooya' },
  { name: 'Sébastien' }
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log(users);
  res.json(users);
});

module.exports = router
