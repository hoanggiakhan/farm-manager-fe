import { LocalDate } from "js-joda";

export class NotificationModel{
    id : string;
    content : string;
    date : LocalDate;
    status : number;
    constructor( id : string,
        content : string,
        date : LocalDate,
        status : number){
          this.id=id;
          this.content=content;
          this.date=date;
          this.status=status;
    }
}