import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../UrlConfig';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }
  /***************************************CREATE DRIVER*************************/
  driver(data){
    this.httpClient.post(APIURL+'driver/create',data)
  }
  /********************************END**************************************/

}
