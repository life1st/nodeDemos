const { addUser, findUser} = require('../db').users
const { verifyUserInfo} = require('../utils')

async function postLogin(ctx) {
  let body = ctx.request.body

  let username = body.username
  let password = body.password
  if (verifyUserInfo(username, password)) {
    ctx.body = {
      msg: 'wrong user info',
      ok: false
    }
    return
  }

  let where = { username }

  await findUser(where).then(res => {
    if (res.length === 0) {
      ctx.body = {
        msg: 'no user info',
        ok: false
      }
    } else {
      for (let item of res) {
        if (item.password === password) {
          ctx.body = {
            msg: 'verified.',
            ok: true
          }
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

async function postRegister(ctx) {
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
  await findUser(where).then(res => {
    return new Promise((resolve, reject) => {
      if (res.length === 0) {
        resolve(addUser({username, password}))
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
  postLogin, postRegister
}