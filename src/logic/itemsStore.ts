import { observable, action } from 'mobx'
import { getItems } from '../api/data'
import { getDataFromDevice, storeDataToDevice, downloadImages } from '../data/dataManager'
import {useTranslation} from 'react-i18next'


export class ItemStore {

    terminals: any = observable([])
    cashRegister: any = observable([])
    relatedProducts: any = observable([])

    cart: any = observable([])

    @observable activityIndecator: boolean = false
    @observable cartItemNumber: number = 0

    @observable imagesPathKeyValue = new Map<string, string>();


   async init(){
       await this.fetchData()
       setTimeout(async () => {
         storeDataToDevice('terminals', JSON.stringify(this.terminals))
         storeDataToDevice('cashRegister', JSON.stringify(this.cashRegister))
         storeDataToDevice('relatedProducts', JSON.stringify(this.relatedProducts))

         let imagesPathKeyValueObj = {}
         this.imagesPathKeyValue.forEach((value, key)=>{
             imagesPathKeyValueObj[key] = value
         })
         await storeDataToDevice('imagesPathKeyValue', JSON.stringify(imagesPathKeyValueObj))
    }, 1500);
         await this.loadDataFromStorage()

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
        getDataFromDevice('relatedProducts').
        then((value)=>{
            this.relatedProducts.replace(JSON.parse(value))
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
    addToCart = (
        addOrRemove: boolean, 
        itemToAdd: any, 
        rentOrSale?: string) => {
        if(addOrRemove){

            const newCart = this.cart.filter(function( obj: any ) {
                return obj.id !== itemToAdd.id;
              });

              this.cart.replace(newCart)
              this.cartItemNumber--
              
        }else{
            itemToAdd['rentOrSale'] = rentOrSale
            this.cart.push(itemToAdd)
            this.cartItemNumber++
        }
    }

    @action
    setRentSale = (id: string, rentOrSale: string) => {
        this.cart.forEach((element: any) => {
            if(element.id === id){
                element['rentOrSale'] = rentOrSale
            }
        });
    }


    @action
    clearCart = () => {
        this.cart.clear()
        this.cartItemNumber = 0
    }

    @action
    async fetchData() {
        let terminals = this.terminals
        let cashRegister = this.cashRegister
        let relatedProducts = this.relatedProducts
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
                if(data[key].categories[0]==="ציוד נלווה"){
                    relatedProducts.push(data[key])
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


