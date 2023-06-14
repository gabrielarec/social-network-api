const User = require("../models/user");
const Thought = require("../models/thought");

//CREATE USER
exports.createUser = async (req, res) => {
  try {
    const userExist = await User.findOne({ username: req.body.username });
    if (userExist) {
      return res.status(400).json({ message: "username already exist !!!" });
    }
    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully !!!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

//GET ALL USER
exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

//DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      await Thought.deleteMany({ username: user.username });
      res.status(200).json({ message: "User deleted successfully !!!", user });
    } else {
      return res.status(400).json({ message: "User id not found !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

//UPDATE USER
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (user) {
      res.status(200).json({ message: "User updated successfully !!!", user });
    } else {
      return res.status(400).json({ message: "User id not found !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

//GET USER BY ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("friends")
      .populate("thoughts");
    if (user) {
      res.status(200).json(user);
    } else {
      return res.status(400).json({ message: "User not found !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

//ADD FRIEND
exports.addFriend = async (req, res) => {
  try {
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(400).json({ message: "FriendId not found !!!" });
    } else if (req.params.userId === req.params.friendId) {
      return res
        .status(400)
        .json({ message: "UserId and FriendId cannot be same !!!" });
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (user) {
      res.status(201).json({ message: "Friend added successfully !!!", user });
    } else {
      return res.status(400).json({ message: "UserId not found !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};

//DELETE FRIEND
exports.deleteFriend = async (req, res) => {
  try {
    const friend = await User.findById(req.params.friendId);
    if (!friend) {
      return res.status(400).json({ message: "FriendId not found !!!" });
    }
    const user = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true, runValidators: true }
    );
    if (user) {
      res
        .status(200)
        .json({ message: "Friend deleted successfully !!!", user });
    } else {
      return res.status(400).json({ message: "UserId not found !!!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong " + error });
  }
};
