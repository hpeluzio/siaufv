import http_jsreport from '@/http/jsreport'

export default {
    namespaced: true,
    actions: {
        GET_FICHAS_ORAIS_ACT(context, payload) {
            const data = {"template":{"shortid":"H1etMtjIIH"},"data":{"trabalhos": payload}}

            http_jsreport.post(process.env.VUE_APP_API_JSREPORT_URL, data, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                  username: process.env.VUE_APP_API_JSREPORT_USER,
                  password: process.env.VUE_APP_API_JSREPORT_PASSWORD
                },          
            })   
            .then(function (response) {
              //return response.download('', 'test.pdf', '');
              let blob = new Blob([response.data], { type: 'application/pdf' })
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = 'SIA - Fichas de Trabalhos Orais.pdf'
              document.body.appendChild(link);
              link.click()
              document.body.removeChild(link);    
              //console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            }); 
        },

        GET_FICHAS_PAINEIS_ACT(context, payload) {
            const data = {"template":{"shortid":"HygnuhsILH"},"data":{"trabalhos": payload}}

            http_jsreport.post(process.env.VUE_APP_API_JSREPORT_URL, data, {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                  username: process.env.VUE_APP_API_JSREPORT_USER,
                  password: process.env.VUE_APP_API_JSREPORT_PASSWORD
                },          
            })   
            .then(function (response) {
              //return response.download('', 'test.pdf', '');
              let blob = new Blob([response.data], { type: 'application/pdf' })
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.download = 'SIA - Fichas de Trabalhos Paineis.pdf'
              document.body.appendChild(link);
              link.click()        
              document.body.removeChild(link);
              //console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });  
        },     
    }
}