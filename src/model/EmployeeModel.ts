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
    role ?: number;
    joinDate : string;
    constructor(employeeId : number,
        fullName : string,
        username : string,
        password : string,
        address : string,
        phoneNumber : string,
        age : number,
        joinDate : string,
        email : string
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
        }
}
export default EmployeeModel;