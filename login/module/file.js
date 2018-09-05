const fs = require('fs')
const readFilePms = (path) => (
  new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
)

async function postFile(ctx) {
  let req = ctx.request
  let file = req.files.file
  const pipeFile = (file) => {
    const reader = fs.createReadStream(file.path)
    const ext = file.name.split('.').pop()
    const fileName = `${Math.random().toString().slice(2)}.${ext}`
    const upStream = fs.createWriteStream(`file/${fileName}`)
    reader.pipe(upStream)

    return fileName
  }
  let files = []
  if (Array.isArray(file)) {
    for (let i = 0; i < file.length; i++) {
      files.push(pipeFile(file[i]))
    }
  } else {
    files.push(pipeFile(file))
  }

  ctx.body = {
    ok: true,
    msg: 'emm..fine',
    files
  }
}

async function getFile(ctx) {
  const fileName = ctx.params.name
  const filePath = 'file'
  const ext = fileName.split('.').pop()

  try {
    const file = await readFilePms(`${filePath}/${fileName}`)
    ctx.status = 200
    ctx.body = file
    ctx.type = ext
  } catch (e) {
    console.log(e)
    ctx.status = 200
    ctx.body = {
      ok: false
    }
  }
  // ctx.body = 'now can get file'
}

module.exports = {
  getFile, postFile
}