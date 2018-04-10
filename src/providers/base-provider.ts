import { HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";

export class BaseProvider {
    protected SERVER: string;
    protected headers: HttpHeaders;

    constructor() {
        //this.SERVER = `${environment.HOST}`;
        this.SERVER = 'http://api.stepin.xmerce.com/external/smt';
        this.headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        });
    }
}