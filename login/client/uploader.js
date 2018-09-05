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
    }
  }).then(res => {
    fileEl.value = null
    let data = res.data
    if (data.ok) {
      for (let i = 0; i < data.files.length; i++) {
        let textEl = document.createElement('p')
        textEl.innerHTML = `<a href="${API_BASE}/file/${data.files[i]}" target="_blank">${data.files[i]}</a>`
        document.body.appendChild(textEl)
      }
    } else {
      document.body.appendChild(
        document.createElement('p').innerText = 'nope.'
      )
    }
  })
})