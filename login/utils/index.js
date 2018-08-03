exports.verifyUserInfo = function(name, pass) {
  return /w{4,}/.test(name) && /w{8,}/.test(pass)
}