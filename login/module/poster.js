const { add, find, findAll, remove} = require('../db').poster

async function getPoster(ctx) {
  let query = ctx.query

  let posterId = query.id
  if (posterId) {
    let where = { posterId: Number(posterId)}
    await find(where).then(res => {
      if (res.length === 0) {
        ctx.body = {
          ok: false,
          msg: 'not has anything.'
        }
      } else {
        let content = []
        res.forEach(item => {
          content.push({
            content: item.content,
            posterId: item.posterId
          })
        })
        ctx.body = {
          ok: true,
          content
        }
      }
    }).catch(err => {
      ctx.body = {
        ok: false,
        msg: err
      }
    })
  } else {
    await findAll().then(res => {
      if (res.length === 0) {
        ctx.body = {
          ok: false,
          msg: 'empty poster'
        }
      } else {
        ctx.body = {
          ok: true,
          content: res
        }
      }
    }).catch(err => {
      ctx.body = {
        ok: false,
        msg: err
      }
    })
  }
}

async function postPoster(ctx) {
  let body = ctx.request.body
  
  let content = body.content
  let posterId = new Date().getTime()
  await add({posterId, content}).then(res => {
    ctx.body = {
      posterId,
      msg: 'add success',
      ok: true
    }
  }).catch(err => {
    console.log('catch err', err)
  })
}

async function removePoster(ctx) {
  let params = ctx.params

  let posterId = params.id
  let where = {posterId: Number(posterId)}
  await remove(where).then(res => {
    ctx.body = {
      ok: true,
      msg: res
    }
  }).catch(err => {
    ctx.body = {
      ok: false,
      msg: err
    }
  })
}

module.exports = {
  getPoster, postPoster, removePoster
}