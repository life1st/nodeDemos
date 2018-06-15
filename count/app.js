const Koa = require('koa')
const app = new Koa()
const cors = require('@koa/cors')
const router = require('koa-router')()

const data = require('./data/index')
let add = data.add1
let lastRestartTime = data.lastRestartTime

router.get('/add', ctx => {
  let countNum = add()
  ctx.status = 200
  ctx.body = JSON.stringify({
    countNum
  })
})
router.get('/restartTime', ctx => {
  let time = lastRestartTime()
  ctx.status = 200
  ctx.body = JSON.stringify({
    time
  })
})
router.get('/serverTime', ctx => {
  let time = new Date().getTime()
  ctx.status = 200
  ctx.body = JSON.stringify({
    time
  })
})


app.use(cors())
app.use(router.routes())
app.listen(3001)