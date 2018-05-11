export class ResResult {
    private resCode: string;
    private resMsg: string;

    constructor(res: any) {
      this.resCode = res.resCode;
      
      if(res.resMsg != null && res.resMsg != "") {
        this.resMsg = decodeURIComponent((res.resMsg).toString().replace(/\+/g, '%20'));
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