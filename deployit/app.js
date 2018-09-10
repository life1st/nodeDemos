let Client = require('ssh2').Client
let config = require('./deploy.config').sshConfig
let zip = require('./zip')

zip()

let conn = new Client()
conn.on('ready', () => {
  console.log('Client :: ready')
  doThen(conn)
}).connect({
  ...config
})

function doThen(conn) {
  console.log('dothen')
  conn.sftp((err, sftp) => {
    if (err) throw err
    sftp.fastPut('./dist/dist.zip', './dist.zip', {}, (err, result) => {
      if (err) throw err
      console.log(result, 'result')
      conn.end()
    })
  })
}