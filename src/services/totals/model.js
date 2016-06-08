import renameId from 'mongoose-rename-id';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  from: Schema.Types.ObjectId,
  to: Schema.Types.ObjectId,
  amount: Number
});
schema.plugin(renameId({ newIdName: 'id', mongoose }));

module.exports = mongoose.model('totals', schema);
