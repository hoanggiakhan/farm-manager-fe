import { LocalDate } from "js-joda";

class AnimalModel{
    animalId : number;  
    animalName : string; 
    importPrice : number;
    sellPrice : number;  
    quantity : number;  
    status : number;  
    age : number;
    buyDate : LocalDate;
    type : number;
    constructor( animalId : number,  
        animalName : string, 
        importPrice : number,  
        quantity : number,  
        status : number,  
        age : number,
        buyDate : LocalDate,
        sellPrice : number,
        type : number
    ){
         this.animalId=animalId;
         this.animalName=animalName;
         this.importPrice=importPrice;
         this.quantity=quantity;
         this.status=status;
         this.age=age;
         this.buyDate = buyDate;
         this.sellPrice=sellPrice;
         this.type=type;
    }
}
export default AnimalModel;