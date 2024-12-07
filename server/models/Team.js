import mongoose from 'mongoose';
import { nanoid } from 'nanoid';

const teamSchema = new mongoose.Schema({
  teamName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9-_\s]+$/
  },
  teamCode: {
    type: String,
    unique: true,
    default: () => nanoid(8).toUpperCase()
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Team = mongoose.model('Team', teamSchema);