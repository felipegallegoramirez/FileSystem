const mongoose = require("mongoose");
//const mongoosePaginate = require("mongoose-paginate-v2");
//const mongoosePaginateAggregate = require("mongoose-aggregate-paginate-v2");
const StorageScheme = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      require: true,
    },

    rol: [{
      type: Number,
    }],

    files_id: [{
      type: String,
    }],

    post_id: [{
      type: String,
    }],

    verified: {
      state: {
        type: Number,
        require: false
      },
      code: {
        type: Number,
        require: false
      },
    },

    ips:[{
        type: String,
        require: true
      }]
    },


  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.models.Users || mongoose.model("Users", StorageScheme);