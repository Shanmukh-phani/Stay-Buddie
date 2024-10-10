const mongoose = require('mongoose');
const { Schema } = mongoose;

const ratingSchema = new Schema({
  buddie_id: { type: Schema.Types.ObjectId, ref: 'Buddie', required: true },
  hostel_id: { type: Schema.Types.ObjectId, ref: 'Hostel', required: true },
  security: { type: Number, required: true, min: 1, max: 5 },
  food: { type: Number, required: true, min: 1, max: 5 },
  facilities: { type: Number, required: true, min: 1, max: 5 },
  value_for_money: { type: Number, required: true, min: 1, max: 5 },
  cleanliness: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rating', ratingSchema);
