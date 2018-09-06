
let userEl = document.querySelector('#username')
let passEl = document.querySelector('#password')
let resEl = document.querySelector('#result')

let loginBtn = document.querySelector('#login')
loginBtn.addEventListener('click', () => {
  let username = userEl.value
  let password = passEl.value
  if (username && password) {
    axios.post(`${API_BASE}/login`, {
      username, password
    }).then(res => {
      let data = res.data
      if (data.ok) {
        resEl.innerText = `OK, ${data.msg}`
      } else {
        resEl.innerText = `ERR, ${data.msg}`
      }
    }).catch(err => {
      resEl.innerText = `ERR, network wrong`
    })
  } else {
    resEl.innerText = `ERR, input your info`
  }
})

let registerBtn = document.querySelector('#register')
registerBtn.addEventListener('click', () => {
  let username = userEl.value
  let password = passEl.value
  if (username && password) {
    axios.post(`${API_BASE}/register`, {
      username, password
    }).then(res => {
      let data = res.data
      if (data.ok) {
        resEl.innerText = `OK, ${data.msg}`
      } else {
        resEl.innerText = `Err, ${data.msg}`
      }
    }).catch(err => {
      resEl.innerText = `ERR, bed network`
    })
  } else {
    resEl.innerText = `ERR, input your info`
  }
})

function autoRegister() {
  let name = () => `bot${new Date().getTime()}`
  let pass = () => `password${Math.random()}`

  userEl.value = name()
  passEl.value = pass()
  registerBtn.click()
}

// setInterval(() => {
//   autoRegister()
//   console.log('registering...')
// }, 0)