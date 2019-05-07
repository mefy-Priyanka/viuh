import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../UrlConfig'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }
  /*********************CREATE ADMIN*****************************/
  login(data) {
    return this.httpClient.post(APIURL + 'user/login', data);
  }

  logininfo(userId: any) {
    console.log('userId', APIURL + 'user/userById?userId=' + userId)
    return this.httpClient.get(APIURL + 'user/userById?userId=' + userId)
  }
}
// return this.http.get(APIURL + 'account/getByAccountId?accountId='+ id)