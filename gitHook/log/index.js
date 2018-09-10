const fs = require('fs')
const filePath = './.log'

let writerStream = fs.createWriteStream(filePath)

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      console.log(data.toString())
      console.log('read success...')

      if (err) reject(err)
      resolve(data.toString())
    })
  })
}

readFile(filePath).then(data => {
  console.log(data)
  writerStream.write(data + JSON.stringify({
    msg: 'hellow'
  }), 'UTF8')
})