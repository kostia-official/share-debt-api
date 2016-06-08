import renameId from 'mongoose-rename-id';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  to: Schema.Types.ObjectId,
  from: [Schema.Types.ObjectId],
  amount: Number,
  name: String
}, {
  timestamps: true
});
schema.plugin(renameId({ newIdName: 'id', mongoose }));

module.exports = mongoose.model('debts', schema);
