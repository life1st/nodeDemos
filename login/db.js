const MongoClient = require('mongodb').MongoClient

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
    })
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

module.exports = {
  add, find
}