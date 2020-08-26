import mongoose from 'mongoose';
import Password from '../tools/Password';

// Describes the data needed to create a new user
interface UserData {
  email: string;
  password: string;
}

// Describes the properties the User model has
interface UserModel extends mongoose.Model<UserDocument> {
  createUser(data: UserData): UserDocument;
}

// Describes the properties the User document has
interface UserDocument extends mongoose.Document, UserData {}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// mongoose middleware fns
userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await Password.toHash(this.get('password') as string);
    this.set('password', hashed);
  }

  done();
});

// mongoose static methods
userSchema.statics.createUser = (data: UserData) => {
  return new User(data);
};

export const User = mongoose.model<UserDocument, UserModel>('User', userSchema);
