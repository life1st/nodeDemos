const Router = require('koa-router')
let router = new Router()

let { postLogin, postRegist} = require('./module')

router.get('/', ctx => {
  ctx.body = JSON.stringify({
    msg: 'hellow',
    ok: true
  })
})

router.get('/login', ctx => {
  ctx.body = 'hellow login'
}).post('/login', async ctx => await postLogin(ctx))

router.get('/regist', ctx => {
  ctx.body = 'hellow register'
}).post('/regist', async ctx => await postRegist(ctx))



module.exports = router