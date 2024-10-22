class ItemModel{
    itemId : number;
    itemName : string;
    quantity : number;
    type : string;
    unit : string; // đơn vị tính
    importPrice : number;
    constructor(itemId : number,
        itemName : string,
        quantity : number,
        type : string,
        unit : string, // đơn vị tính
        importPrice : number,){
          this.itemId=itemId
          this.itemName =itemName
          this.quantity = quantity
          this.type = type
          this.unit = unit
          this.importPrice = importPrice 
    }
}
export default ItemModel;