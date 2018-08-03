const Router = require('koa-router')
let router = new Router()

let { postLogin, postRegister} = require('./module/users')

router.get('/', ctx => {
  ctx.body = {
    msg: 'hellow',
    ok: true
  }
})

router.get('/login', ctx => {
  ctx.body = 'hellow login'
}).post('/login', async ctx => await postLogin(ctx))

router.get('/register', ctx => {
  ctx.body = 'hellow register'
}).post('/register', async ctx => await postRegister(ctx))

router.get('/poster', async ctx => {
  
}).post('/poster', async ctx => {

})

module.exports = router