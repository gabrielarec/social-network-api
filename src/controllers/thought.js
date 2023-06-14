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