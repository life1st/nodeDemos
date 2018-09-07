let fileEl = document.querySelector('#upload')
let submitFileBtn = document.querySelector('#submitFile')

submitFileBtn.addEventListener('click', () => {
  if (fileEl.value.length < 1) return false
  const formData = new FormData()
  // let BASE_URL = 'http://localhost:3000'
  for (let i = 0; i < fileEl.files.length; i++) {
    formData.append('file', fileEl.files[i])
  }
  axios({
    method: 'post',
    url: `${API_BASE}/file`,
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    onUploadProgress: (event) => {
      console.log(event)
      let complete = (event.loaded / event.total * 100 | 0)
      if (complete === 100) {
        complete = 'done.'
        setTimeout(() => {
          document.querySelector('.progress').innerText = ''
        }, 1200)
      } else {
        complete += '%'
      }
      document.querySelector('.progress').innerText = complete
    }
  }).then(res => {
    fileEl.value = null
    let data = res.data
    if (data.ok) {
      for (let i = 0; i < data.files.length; i++) {
        let textEl = document.createElement('p')
        textEl.innerHTML = `
<a href="${API_BASE}/file/${data.files[i]}" target="_blank">${data.files[i]}</a>
<button class="delete-file" data-name=${data.files[i]}>Delete</button>`
        document.body.appendChild(textEl)
      }
    } else {
      let resEl = document.createElement('p')
      resEl.innerText = 'nope.'
      document.body.appendChild(resEl)
    }
  }).catch(err => {
    let resEl = document.createElement('p')
    resEl.innerText = 'nope.'
    document.body.appendChild(resEl)
    setTimeout(() => {
      resEl.remove()
    }, 1200)
  })
})

document.addEventListener('click', evt => {
  let target = evt.target
  if (target.className === 'delete-file') {
    let fileName = target.dataset.name
    let fileEl = target.parentNode
    deleteMe(fileName, fileEl)
  }
})

function deleteMe(fileName, fileEl) {
  let resEl = document.createElement('span')
  axios({
    method: 'delete',
    url: `${API_BASE}/file/${fileName}`,
  }).then(res => {
    if (res.data.ok) {
      resEl.innerText = 'ok'
      setTimeout(() => {
        fileEl.remove()
      }, 1200)
    } else {
      resEl.innerText = 'failed'
    }
    fileEl.appendChild(resEl)
  }).catch(err => {
    resEl.innerText = 'bed network'
    fileEl.appendChild(resEl)
    console.log('err', err)
  })
}