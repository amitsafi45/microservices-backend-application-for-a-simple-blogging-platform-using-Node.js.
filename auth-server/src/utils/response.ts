



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
export function createResponse<T>(
  status: string,
  code: number,
  message: string,
  data?: T,
  list?: T[]
): ReturnResponse<T> {
  return new ReturnResponse<T>(status, code, message, data, list);
}