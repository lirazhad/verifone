import { networkCall } from './request'
import { BASE_URL, ITEMS, responseOK } from './constants'

export async function getItems(){
    let res: any = await networkCall(BASE_URL+ITEMS)
    if(res.status === responseOK ){
      return res.data
    }else{
      return 'error'
    }
  }
  
  