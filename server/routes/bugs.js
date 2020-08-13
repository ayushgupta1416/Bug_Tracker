const router = require('express').Router();


const verify = require('../middleware/verifyToken')
// get all bugs
router.get('/', verify, (req, res) => {
    res.status(200).json(
      {
        bugs: [{
          title: 'Not working',
          desciption: 'hell world'
        }]
      }
    )
  })
  
  module.exports = router; 