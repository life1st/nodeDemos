const { add, find} = require('./db')

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
        if (item.password === password) {
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

module.exports = {
  postLogin, postRegist
}