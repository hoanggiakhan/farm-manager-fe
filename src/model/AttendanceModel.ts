import { LocalDate, LocalTime } from "js-joda";

export class AttendanceModel{
    id : string;
    date : LocalDate;
    checkInTime : LocalTime | null;
    checkOutTime : LocalTime | null;
    totalMerits : number;
    constructor(
        id : string,
        date : LocalDate,
        checkInTime : LocalTime,
        checkOutTime : LocalTime,
        totalMerits : number,
    ){
        this.id=id;
        this.date=date;
        this.checkInTime=checkInTime;
        this.checkOutTime=checkOutTime;
        this.totalMerits=totalMerits;
    }
}