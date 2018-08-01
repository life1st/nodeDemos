const Koa = require('koa')
let app = new Koa()

const Router = require('koa-router')
let router = new Router()

const MongoClient = require('mongodb').MongoClient

const cors = require('@koa/cors')
const Koabody = require('koa-body')

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

async function postLogin(ctx) {
  let body = ctx.request.body

  let username = body.username
  let password = body.password
  if (!(username && password)) {
    ctx.body = JSON.stringify({
      msg: 'no user info',
      ok: false
    })
  }

  let where = { username }

  await find(where).then(res => {
    if (res.length === 0) {
      ctx.body = JSON.stringify({
        msg: 'no user info',
        ok: false
      })
    } else {
      for (let item of res) {
        if (item.password == password) {
          ctx.body = JSON.stringify({
            msg: 'verified.',
            ok: true
          })
          return
        }
      }
      ctx.body = JSON.stringify({
        msg: 'password not match',
        ok: false
      })
    }
  }).catch(err => {
    //
  })
}

async function postRegist(ctx) {
  let body = ctx.request.body

  let username = body.username
  let password = body.password

  if (!(username && password)) {
    ctx.body = JSON.stringify({
      msg: 'no user info',
      ok: false
    })
    return
  }

  let where = { username }
  await find(where).then(res => {
    return new Promise((resolve, reject) => {
      if (res.length === 0) {
        resolve(add({username, password}))
      } else {
        ctx.body = JSON.stringify({
          msg: 'already had same user',
          ok: false
        })
        reject('find same user')
      }
    })
  }).then(res => {
    ctx.body = JSON.stringify({
      msg: 'regist success',
      ok: true
    })
  }).catch(err => {
    // todo maybe error...
    console.log('catch err', err)
  })
}

app.use(cors())
app.use(Koabody())
app.use(router.routes())
app.listen(3003, err => {
  if (err) {
    console.log('err', err)
  }
  console.log('app listen at: http://localhost:3003')
})


// db
function createDb() {
  MongoClient.connect(URL, function(err, db) {

  })
}
const MongoBase = `mongodb://127.0.0.1:27017`

async function find(where) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MongoBase, function(err, db) {
      if (err) {
        console.log('connect err', err)
        reject(err)
      }

      console.log('connected...')
      let dbo = db.db('nodelogin')
      dbo.collection('users').find(where).toArray(function(err, res) {
        if (err) {
          console.log('err', err)
          reject(err)
        } else {
          console.log('find success...', res)
          resolve(res)
        }
        db.close()
      })
    }
    )
  })
}

async function add(user) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(MongoBase, function(err, db) {
      if (err) {
        console.log('connect err', err)
        reject(err)
      }

      console.log('connected...')
      let dbo = db.db('nodelogin')
      dbo.collection('users').insertOne(user, function(err, res) {
        if (err) {
          console.log('err', err)
          reject(err)
        } else {
          console.log('add success...', res)
          resolve(res)
        }
        db.close()
      })
    })
  })
}