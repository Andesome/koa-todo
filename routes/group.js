const KoaRouter = require('koa-router');
const { prefix } = require('../config');
const { getModel } = require('../models');

const router = new KoaRouter({ prefix });
const Record = getModel('records');

// 添加group
router.post('/todos/group', async (ctx) => {
  const { groupName } = ctx.request.body;
  const group = new Record({ groupName });
  const g = await group.save();
  ctx.body = {
    meg: '添加group',
    data: {},
  };
});

// 查询todo group
router.get('/todos/group', async (ctx) => {
  const groups = await Record.find({}, { list: 0 });
  ctx.body = {
    meg: '获取todo list',
    data: {
      list: groups,
    },
  };
});

// 查询单个
router.get('/todos/group/:id', async (ctx) => {
  const { id } = ctx.request.params;
  ctx.body = {
    meg: '查询group',
    id,
  };
});

// 修改todo
router.post('/todos/group/:id', async (ctx) => {
  const { id } = ctx.request.params;
  ctx.body = {
    meg: '添加group',
    id,
  };
});

module.exports = router;
