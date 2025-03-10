import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true
  },
  UserPassword: {
    type: String,
    required: true
  },
  Email: {
    type: String,
    required: true,
    unique: true
  },
  Phone: {
    type: String
  },
  Role: {
    type: String,
    enum: ["admin", "user"],
    default: "user"
  }
}, { 
  versionKey: false,
  timestamps: true 
});

const User = mongoose.model('User', userSchema);

export default User;