import ItemModel from "./ItemModel";

class InventoryModel{
    inventoryId : number;
    items : ItemModel[];
    constructor(inventoryId : number , items : ItemModel[]){
        this.inventoryId=inventoryId;
        this.items=items;
    }
}
export default InventoryModel;