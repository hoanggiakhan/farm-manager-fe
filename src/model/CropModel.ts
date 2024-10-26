import { LocalDate } from "js-joda";

class CropModel{
     cropId : number;  // mã cây trồng
     cropName : string;  // tên cây trồng
     sellPrice : number;  // giá bán
     importPrice : number; // giá nhập
     quantity : number;  // số lượng
     status : number; // trạng thái
     age : number;
     plantingDay : LocalDate; // ngày gieo trồng
     acreage : number; // diện tích gieo trồng
     productivity : number; // năng suất
     type : number;
     constructor( cropId : number,  
        cropName : string, 
        sellPrice : number,  
        importPrice : number, 
        quantity : number,  
        age : number,
        status : number, 
        plantingDay : LocalDate, 
        acreage : number, 
        type : number,
        productivity : number){
            this.cropId=cropId;
            this.cropName=cropName;
            this.sellPrice=sellPrice;
            this.importPrice=importPrice;
            this.quantity=quantity;
            this.status=status;
            this.plantingDay=plantingDay;
            this.acreage=acreage;
            this.productivity=productivity;
            this.age=age;
            this.type=type;
        }
}
export default CropModel;