const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://elenemchedlidze7:AeLhoNZ5bqeiE5D5@user-auth.x3rlbgx.mongodb.net/user-auth?retryWrites=true&w=majority';

mongoose.connect(MONGO_URL)
  .then(() =>{
    console.log('[Mongo] Database Successfully Connected');
  })
  .catch((err) => {
    console.error(`[Mongo] Database Connection Error: ${err}`);
  });

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

module.exports = User;