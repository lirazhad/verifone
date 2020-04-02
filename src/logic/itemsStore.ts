import { observable, action } from 'mobx'
import { getItems } from '../api/data'

export class ItemStore {

    terminals: any = observable([])
    cashRegister: any = observable([])
    relatedProducts: any = observable([])

    @observable activityIndecator: boolean = false
    @observable isSelected: boolean = false


    @action
    async fetchData() {
        let terminals = this.terminals
        let cashRegister = this.cashRegister

        this.activityIndecator = true
        let data = await getItems()
        if(data !== 'error'){
            terminals.length = 0
            cashRegister.length = 0
            Object.keys(data).forEach(function(key: any){
                if(data[key].categories[0]==="קופות רושמות וממוחשבות"){
                    terminals.push(data[key])
                }
                if(data[key].categories[0]==="מסופים ופתרונות ניידים"){
                    cashRegister.push(data[key])
                }
            });

            // console.log(this.terminals)
            // console.log('----------------------------------------')
            // console.log(this.cashRegister)


            //  this.terminals.replace(data[0])
            //  this.cashRegister.replace(data[1])
             //this.relatedProducts.replace(data[2])

            this.activityIndecator = false
        }else{
            setTimeout(() => {
                this.fetchData()
            }, 1500);
        }
    }

}

const dataParse = (items: any): [] => {
    let result:[] = [];
    Object.keys(items).forEach(function(key: any){
        result.push(result[key]);
    });
    return result;
}