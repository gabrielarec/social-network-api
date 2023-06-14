const express = require("express");
const {
  createThought,
  getAllThought,
  getThoughtById,
  updateThought,
  deleteThought,
  createReaction,
  deleteReaction,
} = require("../controllers/thought");

const router = express.Router();

router.post("/thoughts/:userId", createThought);
router.get("/thoughts", getAllThought);
router.delete("/thoughts/:id", deleteThought);
router.put("/thoughts/:id", updateThought);
router.get("/thoughts/:id", getThoughtById);
router.post("/thoughts/:thoughtId/reactions", createReaction);
router.delete("/thoughts/:thoughtId/reactions/:reactionId", deleteReaction);

module.exports = router;
