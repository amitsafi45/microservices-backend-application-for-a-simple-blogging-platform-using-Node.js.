
export class ReturnResponse<T> {
  private static _instance: ReturnResponse<any>;

  data?: T;
  list?: T[];
  status: string;
  code: number;
  message: string;

  private constructor(
    status: string,
    code: number,
    message: string,
    data?: T,
    list?: T[]
  ) {
    this.data = data;
    this.list = list;
    this.status = status;
    this.code = code;
    this.message = message;
  }

  public static getInstance<T>(
    status: string,
    code: number,
    message: string,
    data?: T,
    list?: T[]
  ): ReturnResponse<T> {
    if (!ReturnResponse._instance) {
     
      ReturnResponse._instance = new ReturnResponse<T>(
        status,
        code,
        message,
        data,
        list
      );
    }
    return ReturnResponse._instance;
  }
}



