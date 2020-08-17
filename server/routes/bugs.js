const router = require('express').Router();
const verify = require('../middleware/verify')



const Bug = require('../controllers/Bug')



router.get('/', verify, Bug.getBugs)
router.get('/:id', verify, Bug.getBugByNumber)
router.post('/', verify, Bug.createBug)


router.put('/:id/close', verify, Bug.toggleBugOpenClose({ state: false }))
router.put('/:id/open', verify, Bug.toggleBugOpenClose({ state: true }))


router.put('/:id/labels', Bug.addLabel)
router.delete('/:id/labels/:name', Bug.deleteLabel)


module.exports = router; 