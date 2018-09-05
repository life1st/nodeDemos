const Router = require('koa-router')
let router = new Router()

let { postLogin, postRegister} = require('./module/users')
let { getPoster, postPoster, removePoster} = require('./module/poster')
let { getFile, postFile} = require('./module/file')

const LOGIN_PATH = '/login'
router.get(LOGIN_PATH, ctx => {
  ctx.body = 'hellow login'
}).post(LOGIN_PATH, postLogin)

const REGISTER_PATH = '/register'
router.get(REGISTER_PATH, ctx => {
  ctx.body = 'hellow register'
}).post(REGISTER_PATH, postRegister)

const POSTER_PATH = '/poster'
router
  .get(POSTER_PATH, getPoster)
  .post(POSTER_PATH, postPoster)
  .delete(`${POSTER_PATH}/:id`, removePoster)

const FILE_PATH = '/file'
router.get(FILE_PATH + '/:name', getFile)
  .post(FILE_PATH, postFile)

router.get('*', ctx => {
  ctx.body = {
    msg: 'hellow',
    ok: true
  }
})

module.exports = router