let http = require('http');
let createHandler = require('github-webhook-handler');
let runCommand = require('./utils').runCommand

const DEPLOY_BRANCH = 'deploy'
const BASH_PATH = './sh/build.sh'

let msg = {
  title: 'init',
  event: []
}
function addLog(log) {
  msg.event.push({
    ...log,
    time: new Date().getTime()
  })
}

let handler = createHandler({ path: '/airhook', secret: 'aloha' });
let server = http.createServer(function(req, res) {
  handler(req, res, function(err) {
    let url = require('url').parse(req.url)
    switch (url.path) {
      case '/airhook/event':
        res.statusCode = 200
        res.end(JSON.stringify(msg))
        break
      default:
        res.statusCode = 404;
        res.end('no such location');
    }
  })
}).listen(8086);

handler.on('error', function(err) {
  console.error('Error:', err.message)
  addLog({
    type: 'Error',
    msg: err.message
  })
});

handler.on('push', function(event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref);
  // only DEPLOY_BRANCH will run bash.
  if (event.payload.ref.includes(DEPLOY_BRANCH)) {
    runCommand('sh', [BASH_PATH], function(txt){
      console.log(txt);
      addLog({
        type: 'Deploy',
        msg: {event, txt}
      })
    });
  } else {
    console.log('new push event arrive.')
    addLog({
      type: 'push arrive',
    })
  }
});

handler.on('ping', function(event) {
  console.log('connnect success.')
  msg.title = 'ping'
  msg.event = event
})

// server.on('request',function (req, res) {
//   let url = require('url').parse(req.url)
//   switch (url.path) {
//     case '/event':
//       console.log('success')
//       res.writeHead(200, {"Content-Type": "application/json"})
//       // res.write('hellow', 'utf8')
//       /*JSON.stringify(msg)*/
//       res.end('hellow')
//   }
// })

// handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title)
// });
