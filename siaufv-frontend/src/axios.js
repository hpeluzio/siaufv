import axios from 'axios'

//Setar a URL e PORTA
var URL = process.env.VUE_APP_API_URL
var PORT = process.env.VUE_APP_API_PORT

let axios_instance

if(localStorage.getItem('user')){

  var userSession = JSON.parse(localStorage.getItem('user')) 

  axios_instance = axios.create({
    baseURL: URL + ':' + PORT,
    headers: {
      'Authorization': 'Bearer ' + userSession.token.token
    }
  })
}
else {

  var userSession = JSON.parse(localStorage.getItem('user')) 

  axios_instance = axios.create({
    baseURL: URL + ':' + PORT
  })
}


export default axios_instance