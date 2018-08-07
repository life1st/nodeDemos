let fileEl = document.querySelector('#upload')
let submitFileBtn = document.querySelector('#submitFile')
const formData = new FormData()

submitFileBtn.addEventListener('click', () => {
  if (fileEl.value.length < 1) return false

  // let BASE_URL = 'http://localhost:3000'
  formData.append('file', fileEl.files[0])
  axios({
    method: 'post',
    url: `${API_BASE}/file`,
    data: formData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  }).then(res => {
    let data = res.data
    console.log(data)
  })
})