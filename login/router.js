const Router = require('koa-router')
let router = new Router()

let { postLogin, postRegister} = require('./module/users')
let { getPoster, postPoster, removePoster} = require('./module/poster')

router.get('/', ctx => {
  ctx.body = {
    msg: 'hellow',
    ok: true
  }
})

const LOGIN_PATH = '/login'
router.get(LOGIN_PATH, ctx => {
  ctx.body = 'hellow login'
}).post(LOGIN_PATH, async ctx => {
  await postLogin(ctx)
})

const REGISTER_PATH = '/register'
router.get(REGISTER_PATH, ctx => {
  ctx.body = 'hellow register'
}).post(REGISTER_PATH, async ctx => {
  await postRegister(ctx)
})

const POSTER_PATH = '/poster'
router.get(POSTER_PATH, async ctx => {
  await getPoster(ctx)
}).post(POSTER_PATH, async ctx => {
  await postPoster(ctx)
}).delete(POSTER_PATH, async ctx => {
  await removePoster(ctx)
})

module.exports = router