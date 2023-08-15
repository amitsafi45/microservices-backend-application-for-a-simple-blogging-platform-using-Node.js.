



export class ReturnResponse<T> {
  data?:T
  list?:T[]
    success:boolean;
    code:number;
    message:string; 
    total?: number;
    page?: number;
    perPage?: number;
    totalPages?: number;
    constructor(
      success:boolean,
      code:number,
      message:string,
       data?:T,
       list?:T[],  
       total?: number,
       page?: number,
       perPage?: number,
       totalPages?: number
    ) {
      this.data=data
      this.list=list
      this.success=success;
      this.code=code;
      this.message=message;
      this.total = total;
      this.page = page;
      this.perPage = perPage;
      this.totalPages = totalPages;
  }
 
}
export function createResponse<T>(
  success: boolean,
  code: number,
  message: string,
  data?: T,
  list?: T[], 
  total?: number,
  page?: number,
  perPage?: number,
  totalPages?: number
  
): ReturnResponse<T> {
  return new ReturnResponse<T>(success, code, message, data, list,total,page,perPage,totalPages);
}