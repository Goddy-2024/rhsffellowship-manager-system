import mongoose from 'mongoose';

const fellowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  year: { type: Number },
  
});

export default mongoose.model('Fellow', fellowSchema);
