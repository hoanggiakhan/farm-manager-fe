import { LocalDate } from "js-joda";

export class TransactionModel{
    transactionId : string;
    type : string;
    description : string;
    money : number;
    date : LocalDate;
    constructor(
        transactionId : string,
    type : string,
    description : string,
    money : number,
    date : LocalDate,
    ){
        this.transactionId=transactionId;
        this.type=type;
        this.description=description;
        this.money=money;
        this.date=date
    }
}