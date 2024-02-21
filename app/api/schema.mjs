import mongoose from 'mongoose';

export const sessionInDays = 365
export const nameIdPattern = /^[a-zA-Z0-9]{0,12}$/

const { Schema } = mongoose;

// chat schema
const messageSchema = new Schema({
  fromName: {
    type: String,
    required: true,
  },
  toName: {
    type: String,
    required: true,
  },
  from_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  to_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  messageText: {
    type: String,
    trim: true,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  }
});

let messageModel

try {
  messageModel = mongoose.model('messages');
} catch (error) {
  messageModel = mongoose.model('messages', messageSchema);
}

export { messageModel };