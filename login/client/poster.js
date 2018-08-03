let posterEl = document.querySelector('#poster')

let postBtn = document.querySelector('#postIt')
postBtn.addEventListener('click', () => {
  let content = posterEl.value
  if (content.length === 0) {
    resEl.innerText = 'Err, content is empty'
  } else {
    axios.post(`${API_BASE}/poster`, {
      content
    }).then(res => {
      let data = res.data
      resEl.innerText = `Ok, posterId: ${data.posterId}`
    })
  }
})

let postIdEl = document.querySelector('#postId')
let getPostBtn = document.querySelector('#getPost')
getPostBtn.addEventListener('click', () => {
  let id = postIdEl.value
  if (id.length === 0) {
    resEl.innerText = 'Err, no Post ID'
  } else {
    axios.get(`${API_BASE}/poster`, {
      params: {
        id
      }
    }).then(res => {
      let data = res.data
      if (data.ok)  {
        resEl.innerText = data.content[0].content
      } else {
        resEl.innerText = data.msg
      }
    }).catch(err => {
      resEl.innerText = err
    })
  }
})