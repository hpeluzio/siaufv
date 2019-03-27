import axios from 'axios'

//Setar a URL e PORTA
var URL = process.env.VUE_APP_API_URL
var PORT = process.env.VUE_APP_API_PORT

var userSession = JSON.parse(localStorage.getItem('user')) 


let axios_instance = axios.create({
  baseURL: URL + ':' + PORT,
  headers: {
    'Authorization': 'Bearer ' + userSession.tokenData.token
  }
})

export default axios_instance