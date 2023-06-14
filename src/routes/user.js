const express = require("express");
const {
  createUser,
  getAllUser,
  deleteUser,
  updateUser,
  getUserById,
  addFriend,
  deleteFriend,
} = require("../controllers/user");

const router = express.Router();

router.post("/users", createUser);
router.get("/users", getAllUser);
router.delete("/users/:id", deleteUser);
router.put("/users/:id", updateUser);
router.get("/users/:id", getUserById);
router.post("/users/:userId/friends/:friendId", addFriend);
router.delete("/users/:userId/friends/:friendId", deleteFriend);

module.exports = router;
