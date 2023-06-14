const moment = require("moment");
const mongoose = require("mongoose");

const reactionSchema = new mongoose.Schema(
  {
    reactionId: {
      type: mongoose.Schema.Types.ObjectId,
      default: mongoose.Types.ObjectId,
    },
    reactionBody: {
      type: String,
      required: true,
      max: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: function (createdAt) {
        return moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
      },
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
      versionKey: false,
      transform: (_, ret) => {
        delete ret.id;
      },
    },
  }
);

module.exports = reactionSchema;
