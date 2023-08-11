



export class ReturnResponse<T> {
  data?:T
  list?:T[]
    success:boolean;
    code:number;
    message:string; 
    constructor(
      success:boolean,
      code:number,
      message:string,
       data?:T,
       list?:T[]
    ) {
      this.data=data
      this.list=list
      this.success=success;
      this.code=code;
      this.message=message;
  }
 
}
export function createResponse<T>(
  success: boolean,
  code: number,
  message: string,
  data?: T,
  list?: T[]
): ReturnResponse<T> {
  return new ReturnResponse<T>(success, code, message, data, list);
}