import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the CommonCodePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'commonCode',
})
export class CommonCodePipe implements PipeTransform {
  transform(code_id: any, codeGroupId: any) {
    let codeName: string;
    if (codeGroupId == 'REASON_TYPE') {
      switch (code_id) {
        case 'OP':
          codeName = '발송';
          break;
        case 'OC':
          codeName = '발송취소';
          break;
        case 'BC':
          codeName = '포인트충전';
          break;
        case 'BB':
          codeName = '포인트회수';
          break;
        default:
          break;
      }
      return codeName;    
    }    
    return code_id;  
  }
}
