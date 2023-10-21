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
    users: [{
        type: String,
      }],
    },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Rol || mongoose.model("Rol", StorageScheme);