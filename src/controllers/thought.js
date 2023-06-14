const Thought = require("../models/thought");
const User = require("../models/user");

//CREATE THOUGHT
exports.createThought = async (req, res) => {
  try {
    const userData = await User.findById(req.params.userId);
    if (!userData) {
      return res.status(400).json({ message: "UserId not found !!!" });
    }

    const newThought = new Thought(req.body);
    await newThought.save();

    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { thoughts: newThought._id } },
      { new: true, runValidators: true }
    );

    res.status(201).json({
      message: "Thought created successfully !!!",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};
//GET ALL THOUGHTS
exports.getAllThought = async (req, res) => {
    try {
      const thoughts = await Thought.find({});
      res.status(200).json(thoughts);
    } catch (error) {
      res.status(500).json({ message: "Something went wrong " + error });
    }
  };
  
  //DELETE THOUGHT
  exports.deleteThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.id);
      if (thought) {
        res
          .status(200)
          .json({ message: "Thought deleted successfully !!!", thought });
      } else {
        return res.status(400).json({ message: "Thought id not found !!!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong " + error });
    }
  };
  
  //UPDATE THOUGHT
  exports.updateThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
        runValidators: true,
        new: true,
      });
      if (thought) {
        res
          .status(200)
          .json({ message: "Thought updated successfully !!!", thought });
      } else {
        return res.status(400).json({ message: "Thought id not found !!!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong " + error });
    }
  };
  
  //GET THOUGHT BY ID
  exports.getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.id);
      if (thought) {
        res.status(200).json(thought);
      } else {
        return res.status(400).json({ message: "Thought id not found !!!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong " + error });
    }
  };
  
  //CREATE REACTION
  exports.createReaction = async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (thought) {
        res
          .status(201)
          .json({ message: "Reaction created successfully !!!", thought });
      } else {
        return res.status(400).json({ message: "Thought not found !!!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong " + error });
    }
  };
  
  //DELETE REACTION
  exports.deleteReaction = async (req, res) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
          "reactions.reactionId": req.params.reactionId,
        },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { new: true, runValidators: true }
      );
      if (thought) {
        res
          .status(200)
          .json({ message: "Reaction deleted successfully !!!", thought });
      } else {
        return res
          .status(400)
          .json({ message: "Thought or reaction not found !!!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong " + error });
    }
  };
  