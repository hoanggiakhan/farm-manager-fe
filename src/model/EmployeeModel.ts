class EmployeeModel{
    id?:number;
    employeeId : number;
    firstName : string;
    lastName : string;
    username : string;
    password : string;
    address : string;
    phoneNumber : string;
    email : string;
    age : number;
    role ?: number;
    joinDate : string;
    constructor(employeeId : number,
        firstName : string,
        lastName : string,
        username : string,
        password : string,
        address : string,
        phoneNumber : string,
        age : number,
        joinDate : string,
        email : string
        ){
            this.employeeId=employeeId;
            this.firstName=firstName;
            this.lastName=lastName;
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