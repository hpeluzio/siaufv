import axios from 'axios'

//Setar a URL e PORTA
var URL = 'http://127.0.0.1'
var PORT = '3333'

var userSession = JSON.parse(sessionStorage.getItem('user')) 

let axios_instance = axios.create({
  baseURL: URL + ':' + PORT,
  headers: {
    'Authorization': 'Bearer ' + userSession.tokenData.token
  }
})

export default axios_instance