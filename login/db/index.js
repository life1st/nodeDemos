const MongoClient = require('mongodb').MongoClient

// db
function connectDb() {
  const MongoBase = `mongodb://127.0.0.1:27017`

  return new Promise((resolve, reject) => {
    MongoClient.connect(MongoBase, (err, db) => {
      if (err) {
        console.log('connect err', err)
        reject(err)
      }

      console.log('connected...')
      resolve(db)
    })
  })
}

async function find(where, collection) {
  return connectDb().then(db => {
    let dbo = db.db('nodelogin')

    return new Promise((resolve, reject) => {
      dbo.collection(collection).find(where).toArray((err, res) => {
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

async function add(data, collection) {
  return connectDb().then(db => {
    let dbo = db.db('nodelogin')

    return new Promise((resolve, reject) => {
      dbo.collection(collection).insertOne(data, (err, res) => {
        if (err) reject(err)
        console.log('add success...', res.ops)
        resolve(res)

        db.close()
      })
    })
  })
}

async function remove(where, collection) {
  return connectDb().then(db => {
    let dbo = db.db('nodelogin')

    return new Promise((resolve, reject) => {
      dbo.collection(collection).deleteOne(where, (err, obj) => {
        if (err) reject(err)
        resolve(obj)

        db.close()
      })
    })
  })
}

const USERS_COLLECTION = 'users'
const POSTER_COLLECTION = 'poster'
module.exports = {
  add, find,
  users: {
    addUser(user) {
      return add(user, USERS_COLLECTION)
    },
    findUser(where) {
      return find(where, USERS_COLLECTION)
    }
  },
  poster: {
    add(poster) {
      return add(poster, POSTER_COLLECTION)
    },
    find(id) {
      return find(id, POSTER_COLLECTION)
    },
    findAll() {
      return find('', POSTER_COLLECTION)
    },
    remove(id) {
      return remove(id, POSTER_COLLECTION)
    }
  }
}
