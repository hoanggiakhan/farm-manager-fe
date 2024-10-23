export class FarmRequest{
    farmName : string;
    addressFarm : string;
    fullName: string;
    username: string;
    password: string;
    address: string;
    phoneNumber: string;
    email: string;
    constructor(farmName : string,
        addressFarm : string,
        fullName: string,
        username: string,
        password: string,
        address: string,
        phoneNumber: string,
        email: string){
            this.addressFarm=addressFarm;
            this.farmName=farmName;
            this.fullName=fullName;
            this.username=username;
            this.password=password;
            this.address=address;
            this.phoneNumber=phoneNumber;
            this.email=email;
        }
}