import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl='http://optica-1633249365.us-east-1.elb.amazonaws.com/api/loginAngular';

  constructor(private http:HttpClient ) { }

  login(login: any): Observable<any> {
    return this.http.post<any>(this.loginUrl, login);
  }


}
