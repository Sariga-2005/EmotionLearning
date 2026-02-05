const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  emotion: {
    type: String,
    required: true,
    enum: [
      'Happy', 'Sad', 'Silly', 'Proud', 'Annoyed',
      'Surprised', 'Excited', 'Angry', 'Worried', 'Scared',
      'Love', 'Sick', 'Calm', 'Bored', 'Sleepy',
      'Hungry', 'Embarrassed', 'Ashamed', 'Jealous', 'Worn-out'
    ]
  },
  attempts: {
    type: Number,
    default: 0
  },
  correctIdentifications: {
    type: Number,
    default: 0
  },
  lastPracticed: {
    type: Date,
    default: Date.now
  },
  masteryLevel: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  timestamps: [{
    date: Date,
    correct: Boolean
  }]
});

module.exports = mongoose.model('Progress', ProgressSchema);