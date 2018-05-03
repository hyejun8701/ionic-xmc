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
      if(resMsg != null && resMsg != "") {
        this.resMsg = decodeURIComponent((resMsg).toString().replace(/\+/g, '%20'));
      } else {
        this.resMsg = "";
      }
    }
  }