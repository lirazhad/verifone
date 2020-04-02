import axios from 'axios';

export function networkCall(url: string) {
   return new Promise(function(resolve, reject) {
    axios.get(url)
    .then(function (response: any) {
        resolve(response)
    })
    .catch(async function (error: any) {
        reject(error);
    });
        
      });
  }                                      