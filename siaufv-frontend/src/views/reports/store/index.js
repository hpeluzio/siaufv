import http_jsreport from '@/http/jsreport'

export default {
    namespaced: true,
    actions: {
        GET_AVALIADORES_POR_INSTITUTO_ACT(context, payload) {
            const data = {"template":{"shortid":"S1e_9nhULS"},"data":{"avaliadores": payload}}

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
              link.download = 'SIA - Avaliadores por Instituto.pdf'
              document.body.appendChild(link);
              link.click()       
              document.body.removeChild(link);  
              //console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });
        },

        GET_TRABALHOS_POR_INSTITUTO_ACT(context, payload) {
            const data = {"template":{"shortid":"Hyg-rz2U8r"},"data":{"trabalhos": payload}}

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
              link.download = 'SIA - Trabalhos por Instituto.pdf'
              document.body.appendChild(link);
              link.click()  
              document.body.removeChild(link);      
              //console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });  
        },

        GET_SALAS_E_SUAS_SESSOES_ACT(context, payload) {
            const data = {"template":{"shortid":"rkeAz_ISIH"},"data":{"salas": payload}}

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
              link.download = 'SIA - Salas e suas Sessões.pdf'
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