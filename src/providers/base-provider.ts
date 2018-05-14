import { HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Header } from "ionic-angular";

export class BaseProvider {
    protected SERVER: string;
    protected headers: HttpHeaders;

    constructor() {
        let accessToken = localStorage.getItem('accessToken') != null ? localStorage.getItem('accessToken') : "";

        //this.SERVER = `${environment.HOST}`;
        this.SERVER = 'http://api.stepin.xmerce.com/external/smt';
        this.headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'accessToken': accessToken
        });
    }

    // setAccessToken(): HttpHeaders {
    //     let headers: HttpHeaders;
    //     let accessToken = localStorage.getItem('accessToken');

    //     console.log(accessToken);

    //     if(accessToken != null) {
    //         headers = this.headers.append('accessToken', localStorage.getItem('accessToken'));
    //     } else {
    //         headers = this.headers;
    //     }

    //     return headers;
    // }
}