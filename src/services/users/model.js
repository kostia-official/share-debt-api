import renameId from 'mongoose-rename-id';
import mongoose, { Schema } from 'mongoose';

const schema = new Schema({
  email: String,
  password: String,
  number: String,
  name: String
});
schema.plugin(renameId({ newIdName: 'id', mongoose }));

module.exports = mongoose.model('users', schema);
