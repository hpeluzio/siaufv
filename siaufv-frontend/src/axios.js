import axios from 'axios'

//Setar a URL e PORTA
//var URL = 'http://200.17.76.34'
var URL = process.env.VUE_APP_API_URL
//var PORT = '3333'
var PORT = process.env.VUE_APP_API_PORT

var userSession = JSON.parse(sessionStorage.getItem('user')) 

let axios_instance = axios.create({
  baseURL: URL + ':' + PORT,
  headers: {
    'Authorization': 'Bearer ' + userSession.tokenData.token
  }
})

export default axios_instance