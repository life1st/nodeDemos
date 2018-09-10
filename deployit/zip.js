const archiver = require('archiver')
const fs = require('fs')
let srcDir = require('./deploy.config').srcDir

function zipDist() {
  const zipStream = fs.createWriteStream('./dist/dist.zip')
  const zip = archiver('zip')
  zip.pipe(zipStream)
  zip.directory(srcDir)
  zip.finalize()
}

module.exports = zipDist