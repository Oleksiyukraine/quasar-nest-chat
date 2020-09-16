// Mongoose
import * as mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  from: { type: Object, required: true },
  room: { type: Object, default: { name: 'Main' } },
  text: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export default MessageSchema;
