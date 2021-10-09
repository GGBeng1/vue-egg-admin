'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const time = new Date().getTime();
  const UserSchema = new mongoose.Schema(
    {
      password: { type: String, required: true },
      username: { type: String, required: true, unique: true },
      roletype: { type: String },
      nickname: { type: String, required: true },
      avatarUrl: { type: String },
      extra: { type: mongoose.Schema.Types.Mixed },
      createdAt: { type: Date, default: time },
    },
    { versionKey: false }
  );
  return mongoose.model('User', UserSchema);
};
