const { sendErrorResponse, send404Response } = require('../utils/responder');
const { BAD_REQUEST } = require('../constants.js');
const { Bug, validateBug, validateLabel } = require('../models/bugs');


//getBugs
exports.getBugs = async (req, res) => {
    try {
      let bugs = await Bug.find({});
      res.json(bugs);
    } catch {
      sendErrorResponse(res, BAD_REQUEST, err);
    }
  }

// getBugsByNumber
  exports.getBugByNumber = async (req, res) => {
    try {
      let bug = await Bug.findOne({ bugId: req.params.id });
      if (!bug) return send404Response(res);
  
      res.json(bug);
    } catch (err) {
      sendErrorResponse(res, BAD_REQUEST, err);
    }
  }

  //createBug

  exports.createBug = async (req, res) => {
    const { error, value } = validateBug(req.body);
    if (error) return send404Response(res);
  
    try {
      let authorDetails = {
        username: req.user.username,
        name: req.user.name,
      }
      let bug = new Bug({ ...value, author: authorDetails });
      const newBug = await bug.save();
      res.json(newBug);
    } catch (err) {
      sendErrorResponse(res, BAD_REQUEST, err);
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
        if (!bug) return send404Response(res);
  
        res.json(bug);
      } catch (err) {
        sendErrorResponse(res, BAD_REQUEST, err);
      }
    }
  }
  // addLabel
  exports.addLabel = async (req, res) => {
    const { error, value } = validateLabel(req.body);
    if (error) return sendErrorResponse(res, BAD_REQUEST, error.details[0].message);
  
    try {
      // preventing _id in LabelSchema fixes the issue to `$addToSet` not working
      let bug = await Bug.findOneAndUpdate(
        { bugId: req.params.id },
        { $addToSet: { labels: value } },
        { new: true }
      );
      if (!bug) return send404Response(res);
  
      res.json(bug);
    } catch (err) {
      sendErrorResponse(res, BAD_REQUEST, err);
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
      if (!bug) return send404Response(res);
  
      res.json(bug);
    } catch (err) {
      sendErrorResponse(res, BAD_REQUEST, err);
    }
  } 
  