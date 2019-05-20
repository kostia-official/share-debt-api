const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    from: Schema.Types.ObjectId,
    to: Schema.Types.ObjectId,
    amount: Number
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('totals', schema);
