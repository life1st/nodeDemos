let countNum = 0
let time = new Date()

function add1() {
  countNum += 1;
  return countNum
}
function lastRestartTime() {
  return time.getTime()
}

module.exports = {
  add1, lastRestartTime
}