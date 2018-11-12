const KoaRouter = require('koa-router');
const { prefix } = require('../config');
const { getModel } = require('../models');

const router = new KoaRouter({ prefix });
const Record = getModel('records');

// 添加todo
router.post('/todo/:groupId', async (ctx) => {
  const { groupId } = ctx.params;
  const record = ctx.request.body;
  const newRec = await Record.findByIdAndUpdate(groupId, {
    $push: { list: { ...record, create_time: new Date() } },
  });
  ctx.body = {
    meg: '添加todo',
    data: {
      groupId,
      newRec,
    },
  };
});

// 查询todo
router.get('/todo', async (ctx) => {
  ctx.body = {
    meg: '获取todo list',
  };
});

// 查询单个
router.get('/todo/:id', async (ctx) => {
  const { id } = ctx.request.params;
  ctx.body = {
    meg: '查询todo',
    id,
  };
});

// 修改todo
router.post('/todo/:id', async (ctx) => {
  const { id } = ctx.request.params;
  ctx.body = {
    meg: '添加todo',
    id,
  };
});

module.exports = router;
