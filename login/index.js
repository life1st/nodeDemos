const Koa = require('koa')
let app = new Koa()

const router = require('./router')

const cors = require('@koa/cors')
const koabody = require('koa-body')

app.use(async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  console.log(ctx.method, ctx.path, `time: ${ms} ms`)
})
app.use(cors())
app.use(koabody())
app.use(router.routes())
app.listen(3003, err => {
  if (err) {
    console.log('err', err)
  }
  console.log('app listen at: http://localhost:3003')
})
