import { LocalDate } from "js-joda";
import { RoleModel } from "./RoleModel";

class EmployeeModel{
    id?:number;
    employeeId : number;
    fullName : string;
    username : string;
    password : string;
    address : string;
    phoneNumber : string;
    email : string;
    age : number;
    nameRole : string;
    joinDate : LocalDate;
    salary : number;
    constructor(employeeId : number,
        fullName : string,
        username : string,
        password : string,
        address : string,
        phoneNumber : string,
        age : number,
        joinDate : LocalDate,
        email : string,
        nameRole : string,
        salary : number
        ){
            this.employeeId=employeeId;
            this.fullName=fullName;
            this.username=username;
            this.password=password;
            this.address=address;
            this.phoneNumber=phoneNumber;
            this.age=age;
            this.joinDate=joinDate;
            this.email=email;
            this.nameRole=nameRole;
            this.salary=salary;
        }
}
export default EmployeeModel;