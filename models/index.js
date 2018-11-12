const mongoose = require('mongoose');

const DB_URL = 'mongodb://47.96.109.136:27017/todo';

mongoose.Promise = global.Promise;

// 连接数据库
mongoose.connect(
  DB_URL,
  (err) => {
    if (!err) {
      console.log('connected success');
    } else {
      console.log('connected fail');
    }
  },
);

const models = {
  records: {
    groupName: { type: String, required: true },
    list: [
      {
        content: { type: String, required: true },
        status: { type: Number, required: true },
        create_time: { type: Date, required: true },
        modify_time: { type: Date },
        completed_time: { type: Date },
        expect_time: { type: Date },
      },
    ],
  },
};

for (const m in models) {
  if (Object.prototype.hasOwnProperty.call(models, m)) {
    mongoose.model(m, new mongoose.Schema(models[m]));
  }
}

module.exports = {
  getModel(name) {
    return mongoose.model(name);
  },
};
