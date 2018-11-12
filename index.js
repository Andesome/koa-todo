const Koa = require('koa');
// const Router = require('koa-router');
const koaBody = require('koa-body');
const recordRouter = require('./routes/record');
const groupRouter = require('./routes/group');

const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  try {
    await next();
  } catch (e) {
    // console.log('统一处理错误', e);
    ctx.body = {
      code: 500,
      msg: e.message,
      errorObject: {
        message: e.message,
        name: e.name,
        stringValue: e.stringValue,
        kind: e.kind,
        value: e.value,
        path: e.path,
        reason: e.reason,
      },
    };
  }
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

app
  .use(koaBody({ strict: false, json: true }))
  // .use(router.allowedMethods())
  .use(recordRouter.routes())
  .use(groupRouter.routes());

app.listen(3000, () => {
  console.log('app start on 3000');
});
