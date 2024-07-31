import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type:String,
        required:true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    {
      timestamps: true,
    }
  );

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre('save', async function (next) {
  // Check if the password field has been modified
  if (!this.isModified('password')) {
    // If the password hasn't been modified, proceed with the save operation
    return next();
  }

  // Generate a salt with a cost factor of 10
  const salt = await bcrypt.genSalt(10);
  // Hash the password with the generated salt and assign the hash to the password field
  this.password = await bcrypt.hash(this.password, salt);
  // Proceed with the save operation
  next();
});

  
const User = mongoose.model('User', userSchema);

export default User;