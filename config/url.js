import env from './env'

const DEV_URL = 'http://118.89.190.166:9980'
const PRO_URL = 'http://123.206.195.237:9980'

export default env === 'development' ? DEV_URL : PRO_URL
