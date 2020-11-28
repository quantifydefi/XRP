export default function ({ $axios }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    console.log(code)
    return error.response
  })
}
