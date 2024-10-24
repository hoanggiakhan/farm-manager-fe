class TaskModel{
    taskId : number;
    title : string;
    description : string;
    date : string;
    status : number;
   nameEmployee : string;
   animalName ?: string;
   cropName ?: string;
   constructor(title : string,
    description : string,
   date : string,
    status : number,
   nameEmployee : string,
   taskId : number
){
    this.title=title;
    this.date=date;
    this.description=description;
    this.nameEmployee=nameEmployee;
    this.status=status;
    this.taskId=taskId;
   }
}

export default TaskModel;