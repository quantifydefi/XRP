import https from 'https'

// mock untrusted certificate for SSR, only for development
export default function ({ $axios }) {
  if (process.env.RUN_ENV === 'development') {
    $axios.defaults.httpsAgent = new https.Agent({ rejectUnauthorized: false })
  }
}
