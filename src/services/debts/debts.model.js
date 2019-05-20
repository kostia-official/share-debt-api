const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema(
  {
    to: Schema.Types.ObjectId,
    from: [Schema.Types.ObjectId],
    amount: Number,
    name: String
  },
  {
    timestamps: true,
    versionKey: false
  }
);

module.exports = mongoose.model('debts', schema);
