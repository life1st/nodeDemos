const { addUser, findUser } = require('../db').users
const { verifyUserInfo } = require('../utils')

async function postLogin(ctx) {
  let body = ctx.request.body

  let username = body.username
  let password = body.password
  if (verifyUserInfo(username, password)) {
    return {
      msg: 'wrong user info',
      ok: false
    }
  }

  let where = { username }

  await findUser(where).then(res => {
    if (res.length === 0) {
      return {
        msg: 'no user info',
        ok: false
      }
    } else {
      for (let item of res) {
        if (item.password === password) {
          return {
            msg: 'verified.',
            ok: true
          }
        }
      }
      return {
        msg: 'password not match',
        ok: false
    }
    }
  }).catch(err => {
    return {
      msg: err,
      ok: false
    }
  })
}

async function postRegister(ctx) {
  let body = ctx.request.body

  let username = body.username
  let password = body.password

  if (!(username && password)) {
    return {
      msg: 'no user info',
      ok: false
    }
  }

  let where = { username }
  await findUser(where).then(res => {
    return new Promise((resolve, reject) => {
      if (res.length === 0) {
        resolve(addUser({ username, password }))
      } else {
        reject({
          msg: 'already had same user',
          ok: false
        })
      }
    })
  }).then(res => {
    ctx.body = {
      msg: 'regist success',
      ok: true
    }
  }).catch(err => {
    // todo maybe error...
    console.log('catch err', err.msg)
    return err
  })
}

module.exports = {
  postLogin, postRegister
}