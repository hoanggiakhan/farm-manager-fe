class AnimalModel{
    animalId : number;  
    animalName : string; 
    importPrice : number;
    sellPrice : number;  
    quantity : number;  
    status : number;  
    age : number;
    buyDate : string;
    constructor( animalId : number,  
        animalName : string, 
        importPrice : number,  
        quantity : number,  
        status : number,  
        age : number,
        buyDate : string,
        sellPrice : number
    ){
         this.animalId=animalId;
         this.animalName=animalName;
         this.importPrice=importPrice;
         this.quantity=quantity;
         this.status=status;
         this.age=age;
         this.buyDate = buyDate;
         this.sellPrice=sellPrice;
    }
}
export default AnimalModel;