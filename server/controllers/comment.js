const { Bug } = require('../models/bugs');
const { validateComment } = require('../models/comment');
const { NOTIFY_TYPES } = require('../constants');

//GET all comments with a specified bugId

exports.getComments = async (req, res) => {
    try {
      const { comments } = await Bug.findOne({ bugId: req.params.bugId })
      if (!comments) res.notFound({ error: `Bug#${req.params.bugId} Not Found` });
  
      res.ok(comments);
    } catch (err) {
      res.status(INTERNAL_ERROR)({
        message: 'Something went wrong while getting comments',
        error: err
      })
    }
  }

  //add a comments to a specified bugId

  exports.createComment = async (req, res) => {
    const { error, value } = validateComment(req.body);
  
    if (error) return res.unprocessable({ error: error.details[0].message });
  
    try {
      const bug = await Bug.findOne({ bugId: req.params.bugId });
      if (!bug) return res.notFound({ error: `Bug#${req.params.bugId} Not Found` });
  
      let authorDetails = {
        username: req.user.username,
        name: req.user.name,
        _id: req.user._id
      };
  
      bug.comments.push({
        body: value.body,
        author: authorDetails
      });
  
      const newBug = await bug.save();
      res.ok(newBug);
    } catch (err) {
      res.internalError({
        message: 'Something went wrong while adding new comment',
        error: err
      })
    }
  }

  //remove a comments from specified bugId

  exports.deleteComment = async (req, res) => {
    try {
      let comment = await Bug.findOneAndUpdate(
        { bugId: req.params.bugId },
        { $pull: { "comments": { _id: req.params.comment_id } } },
        { new: true }
      );
      if (!comment) res.notFound({ error: 'Not found' })
  
      res.ok(comment);
    } catch (err) {
      res.internalError({
        message: `Something went wrong while deleting comment#${req.params.comment_id}`,
        error: err
      })
    }
  }