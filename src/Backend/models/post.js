const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    title: {
        type: String,
        required: true,
        trim: true
      },
    description: {
        type: String,
        required: true,
        trim: true
      },
    images: [{
      type: String,
    }],
    text: [{
      type: String,
    }],
    order: [{
      type: String,
    }],
    owner: {
      type: String,
      required: true,
      trim: true
    },
    },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Post || mongoose.model("Post", StorageScheme);