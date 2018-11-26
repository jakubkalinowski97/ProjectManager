import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, RequestOptions } from '@angular/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  prefix = 'http://localhost:8080';
  loginUrl = this.prefix + '/login';
  registerUrl = this.prefix + '/users';
  userUrl = this.prefix + '/users/{id}';

  constructor(private http: HttpClient, private sharedService: SharedService) { }

  login(login: string, password: string): Observable<any> {
    const body = {
      // tslint:disable-next-line:quotemark
      "email": login,
      // tslint:disable-next-line:quotemark
      "password": password
    };
    return this.http.post(this.loginUrl, JSON.stringify(body), this.httpOptions);
  }

  register(newUser): Observable<any> {
    return this.http.post(this.registerUrl, JSON.stringify(newUser), this.httpOptions);
  }

  getUser(userId): Observable<any> {
    const userUrl = this.userUrl.replace('{id}', userId);
    return this.http.get(userUrl);
  }

  editUser(user): Observable<any> {
    const url = this.userUrl.replace('{id}', this.sharedService.userId) ;
    return this.http.put(url, JSON.stringify(user), this.httpOptions);
  }
}
