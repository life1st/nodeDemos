// const fs = require('fs')


async function postFile(ctx) {
  let body = ctx.request.body

  let file = body.files.file
  const reader = fs.createWriteStream(file.path)
  const ext = file.name.split('.').pop()
  const upStream = fs.createWriteStream(`file/${Math.random().toString()}.${ext}`)
  reader.pipe(upStream)
  return ctx.body = {
    ok: true,
    msg: 'emm..fine'
  }
}

async function getFile(ctx) {
  ctx.body = 'now can get file'
}

module.exports = {
  getFile, postFile
}