const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    name: {
        type: String,
        required: true,
        trim: true
      },
      image: {
        type: String,
        required: true,
        trim: true
      },
      rol: [{
        type: String,
      }],
      users: [{
        type: String,
      }],
      files_id: [{
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

module.exports = mongoose.models.Folder || mongoose.model("Folder", StorageScheme);