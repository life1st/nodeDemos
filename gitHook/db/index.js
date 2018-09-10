let dbClient = require('mongodb').MongoClient
let config = require('../config.json').database
let url = `mongodb://${config.host}:${config.port}`

dbClient.connect(url, function(err, db) {
  if (err) throw err
  console.log('connected...')

  let dbase = db.db('hook')
  let mydata = {
    name: 'mongo',
    url: `It's a url of test data.`
  }

/*  dbase.createCollection('site', function (err, res) {
    if (err) throw err
    console.log('create collection...')
    db.close()
  })*/

  // dbase.collection('user').insertOne(mydata, function (err, res) {
  //   if (err) throw err
  //   console.log('insert success...')
  //   db.close()
  // })

  let myArr = []
  const LEN = 10
  const names = ['mongo1', 'mongo2', 'mongo3', 'mongos']
  const NAMES_LEN = names.length
  const urls = `It's a url of test data`
  for (let i = 0; i < LEN; i++) {
    myArr.push({
      name: names[i % NAMES_LEN],
      url: `${urls} ${i}`,
      time: Math.floor(Math.random() * 100000)
    })
  }
  // dbase.collection('user').insertMany(myArr, function (err, res) {
  //   if (err) throw err
  //   console.log('insert num is: ' + res.insertedCount)
  //
  //   db.close()
  // })

  // dbase.collection('user').find({name: 'mongo'}).toArray(function (err, res) {
  //   if (err) throw err
  //   console.log(res)
  //
  //   db.close()
  // })

  // let where = { name: 'mongo'}
  // let newData = {
  //   $set: { url: 'http://newurl.com'}
  // }
  // dbase.collection('user').updateOne(where, newData, function (err, res) {
  //   if (err) throw err
  //   console.log('update success...')
  //
  //   db.close()
  // })

  // let where = { name: 'mongo'}
  // let newData = {
  //   $set: { url: 'http://updatemanydata.com' }
  // }
  // dbase.collection('user').updateMany(where, newData, function (err, res) {
  //   if (err) throw err
  //   console.log(res.result.nModified + 'item has been update')
  //
  //   db.close()
  // })

  // let where = { name: 'mongo'}
  // dbase.collection('user').deleteOne(where, function (err, res) {
  //   if (err) throw err
  //   console.log('delete success...')
  //
  //   db.close()
  // })
  // dbase.collection('user').deleteMany(where, function (err, res) {
  //   if (err) throw err
  //   console.log(res.result.n + 'item has been deleted...')
  //
  //   db.close()
  // })

  let sortRule = { time: 1}
  dbase.collection('user').find().sort(sortRule).toArray(function (err, res) {
    if (err) throw err
    console.log(res)

    db.close()
  })
})