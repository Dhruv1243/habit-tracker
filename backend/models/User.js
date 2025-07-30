import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", async function (next) {
  //you automate the hashing in one central place — no need to worry about it elsewhere in your code.
  if (!this.isModified("password")) return next(); //we check if the password is new or modified, if its now then we skip the hashing process

  const salt = await bcrypt.genSalt(10); //create a random salt for better password uniqueness
  this.password = await bcrypt.hash(this.password, salt); //replace the plain password with the hashed one
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};
const User = mongoose.model("User", UserSchema);
export default User;
