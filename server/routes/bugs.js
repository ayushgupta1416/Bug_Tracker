const router = require('express').Router();



// get all bugs
router.get("/bug",async(req, res) => {
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