import { HttpHeaders } from "@angular/common/http";
import { environment } from "../environments/environment";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class BaseProvider {
    protected SERVER: string;
    protected headers: HttpHeaders;
    rootPage = new BehaviorSubject<string>("default message");
    constructor() {
        let accessToken = localStorage.getItem('accessToken') != null ? localStorage.getItem('accessToken') : "";

        // dev 빌드 시 사용
        this.SERVER = `${environment.HOST}`;

        // prod 빌드 시 사용
        //this.SERVER = 'http://api.stepin.xmerce.com/external/smt';

        this.headers = new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'accessToken': accessToken
        });
    }

    setRootPage(page) {
        this.rootPage.next(page);
    }
}