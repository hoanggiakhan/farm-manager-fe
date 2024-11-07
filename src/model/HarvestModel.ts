import { LocalDate } from "js-joda";

export class HarvestModel{
    harvestId : number;
    harvestDate : LocalDate; 
    quantity : number;  
    sellPrice : number; 
    cropName : string;
    constructor(harvestDate : LocalDate, 
        quantity : number,  
        sellPrice : number, 
        cropName : string,
       harvestId : number
    ){
            this.harvestDate=harvestDate,
            this.quantity=quantity,
            this.sellPrice=sellPrice,
            this.cropName=cropName,
            this.harvestId=harvestId
        }
}