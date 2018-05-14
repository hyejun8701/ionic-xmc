export class ResResult {
    private resCode: string;
    private resMsg: string;

    constructor(res: any) {
      this.resCode = res.result_code;
      
      if(res.result_msg != null && res.result_msg != "") {
        this.resMsg = decodeURIComponent((res.result_msg).toString().replace(/\+/g, '%20'));
      } else {
        this.resMsg = "";
      }
    }
  
    getResCode() {
     return this.resCode;
    }

    getResMsg() {
     return this.resMsg;
    }
  }