import { observable, action } from 'mobx'
import { getItems } from '../api/data'
import { getDataFromDevice, storeDataToDevice, downloadImages } from '../data/dataManager'

export class ItemStore {

    terminals: any = observable([])
    cashRegister: any = observable([])
    relatedProducts: any = observable([])

    cart: any = observable([])

    @observable activityIndecator: boolean = false
    @observable cartItemNumber: number = 0

    @observable imagesPathKeyValue = new Map<string, string>();


   async init(){
    //    await this.fetchData()
    //    setTimeout(() => {
    //      storeDataToDevice('terminals', JSON.stringify(this.terminals))
    //      storeDataToDevice('cashRegister', JSON.stringify(this.cashRegister))

    //      let imagesPathKeyValueObj = {}
    //      this.imagesPathKeyValue.forEach((value, key)=>{
    //          imagesPathKeyValueObj[key] = value
    //      })
    //      storeDataToDevice('imagesPathKeyValue', JSON.stringify(imagesPathKeyValueObj))

    // }, 1500);
    this.loadDataFromStorage()
    }


    async loadDataFromStorage(){
        getDataFromDevice('terminals').
        then((value)=>{
            this.terminals.replace(JSON.parse(value))
        })
        getDataFromDevice('cashRegister').
        then((value)=>{
            this.cashRegister.replace(JSON.parse(value))
        })

        let imagesPathKeyValue = this.imagesPathKeyValue 
        getDataFromDevice('imagesPathKeyValue').
        then((value)=>{
            let imagesPath = JSON.parse(value)
            Object.keys(imagesPath).forEach(function(key){
                imagesPathKeyValue.set(key, imagesPath[key])
 
            })
       
        })
    }

    @action
    addToCart = (addOrRemove: boolean, itemToAdd: any) => {
        if(addOrRemove){
            this.cart = this.cart.filter(function( obj: any ) {
                return obj.id !== itemToAdd.id;
              });

              this.cartItemNumber--
              
        }else{
            this.cart.push(itemToAdd)
            this.cartItemNumber++
        }
    }



    @action
    async fetchData() {
        let terminals = this.terminals
        let cashRegister = this.cashRegister
        let imagesPathKeyValue = this.imagesPathKeyValue

        this.activityIndecator = true
        let data = await getItems()
        if(data !== 'error'){
            terminals.length = 0
            cashRegister.length = 0
             Object.keys(data).forEach(function(key: any){
                if(data[key].categories[0]==="קופות רושמות וממוחשבות"){
                    terminals.push(data[key])
                    downloadImages(data[key].images, imagesPathKeyValue)
                }
                if(data[key].categories[0]==="מסופים ופתרונות ניידים"){
                    cashRegister.push(data[key])
                    downloadImages(data[key].images, imagesPathKeyValue)
                }
            });


            this.activityIndecator = false
        }else{
            setTimeout(() => {
                this.fetchData()
            }, 1500);
        }
    }

}


