export class ReturnResponse<T> {
  data?:T
  list?:T[]
    status:string;
    code:number;
    message:string; 
    constructor(
      status:string,
      code:number,
      message:string,
       data?:T,
       list?:T[]
    ) {
      this.data=data
      this.list=list
      this.status=status;
      this.code=code;
      this.message=message;
  }
}