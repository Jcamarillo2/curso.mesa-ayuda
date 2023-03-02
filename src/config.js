import {config} from 'dotenv'
config()

//console.log(process.env.PORT)
//console.log(process.env.DB_USER)
export default{
    proxyRoute: process.env.PROXY_ROUTE || 'http://apihd3.asc.com.mx:8098/',
    publicFolder: process.env.REACT_APP_PUBLIC_FOLDER || 'http://localhost/helpdeskasc/assets/',
}