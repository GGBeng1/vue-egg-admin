module.exports = app => {
  const mongoose = app.mongoose
  const UserSchema = new mongoose.Schema({
    password: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    roletype: { type: String, required: true },
    nickname: { type: String, required: true },
    avatarUrl: { type: String },
    extra: { type: mongoose.Schema.Types.Mixed },
    createdAt: { type: Date, default: Date.now }
  })
  return mongoose.model('User', UserSchema)
}
