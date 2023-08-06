export class ReturnResponse {
    status:string;
    code:number;
    message:string; 
    constructor(
      status:string,
      code:number,
      message:string,
     
    ) {
      this.status=status;
      this.code=code;
      this.message=message;
  }
}