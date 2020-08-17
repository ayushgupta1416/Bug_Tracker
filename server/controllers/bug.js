const { Bug, validateBug, validateLabel } = require('../models/bugs');



//getBugs
exports.getBugs = async (req, res) => {
    try {
      let bugs = await Bug.find({});
      if (!bugs) return res.notFound({ error: 'Not Found' });
      res.ok({ data: bugs });
    } catch {
       res.internalError({
      error: `Something went wrong while getting bugs`,
    })
    }
  }

// getBugsByNumber
  exports.getBugByNumber = async (req, res) => {
    try {
      let bug = await Bug.findOne({ bugId: req.params.id });
      if (!bug) return res.notFound({ error: `Bug#${req.params.bugId} Not Found` })
  
      res.ok({ data: bug });
    } catch (err) {
      res.internalError({
        error: `Something went wrong while getting bug#${req.params.bugId}`,
      })
    }
  }

  //createBug

  exports.createBug = async (req, res) => {
    const { error, value } = validateBug(req.body);
    if (error)  return res.unprocessable({ error: error.details[0].message })
  
    try {
      let authorDetails = {
        username: req.user.username,
        name: req.user.name,
      }
      let bug = new Bug({ ...value, author: authorDetails });
      const newBug = await bug.save();
      res.json(newBug);
    } catch (err) {
      res.internalError({
        error: `Something went wrong while creating new bug`,
      })
    }
  }

  //toggleBugOpenClose

  exports.toggleBugOpenClose = ({ state }) => {
    return async (req, res) => {
      try {
        // {new: true} tells mongo to return the updated document
        let bug = await Bug.findOneAndUpdate(
          { bugId: req.params.id },
          { isOpen: state },
          { new: true }
        );
        if (!bug) return res.notFound({ error: `Bug#${req.params.bugId} Not Found` });
  
        res.json(bug);
      } catch (err) {
        res.internalError({
          error: `Something went wrong`,
        })
      }
    }
  }
  // addLabel
  exports.addLabel = async (req, res) => {
    const { error, value } = validateLabel(req.body);
    if (error) return res.unprocessable({ error: error.details[0].message })
  
    try {
      // preventing _id in LabelSchema fixes the issue to `$addToSet` not working
      let bug = await Bug.findOneAndUpdate(
        { bugId: req.params.id },
        { $addToSet: { labels: value } },
        { new: true }
      );
      if (!bug)  return res.notFound({ error: `Bug#${req.params.bugId} Not Found` });
  
      res.ok({ data: bug });
    } catch (err) {
      res.internalError({
        error: `Something went wrong while adding new label`,
      })
    }
  }
  
  
// deleteLabel
   
  exports.deleteLabel = async (req, res) => {
    try {
      let bug = await Bug.findOneAndUpdate(
        { bugId: req.params.id },
        { $pull: { "labels": { name: req.params.name } } },
        { new: true }
      );
      if (!bug) return res.notFound({ error: `Bug#${req.params.bugId} Not Found` });
  
      res.json(bug);
    } catch (err) {
      res.internalError({
        error: `Something went wrong while deleting label`,
      })
    }
  } 
  