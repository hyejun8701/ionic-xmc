export class ResResult {
    private resCode: string;
    private resMsg: string;
  
    getResCode() {
     return this.resCode;
    }

    setResCode(resCode) {
     this.resCode = resCode;
    }

    getResMsg() {
     return this.resMsg;
    }

    setResMsg(resMsg) {
     this.resMsg = resMsg;
    }
  }