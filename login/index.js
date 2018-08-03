const Koa = require('koa')
let app = new Koa()

const router = require('./router')

const cors = require('@koa/cors')
const Koabody = require('koa-body')


app.use(cors())
app.use(Koabody())
app.use(router.routes())
app.listen(3003, err => {
  if (err) {
    console.log('err', err)
  }
  console.log('app listen at: http://localhost:3003')
})


// db
function createDb() {
  MongoClient.connect(URL, function(err, db) {

  })
}