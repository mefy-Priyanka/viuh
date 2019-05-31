import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../UrlConfig';
@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private httpClient: HttpClient) { }
   /***************************************CONTACT DRIVER*************************/
   contactCreate(data){
    return this.httpClient.post(APIURL+'driver/create',data)
  }
  /********************************END**************************************/
  
/*****************************IMAGE PREVIEW**********************/
preview(imageId){
  return this.httpClient.get(APIURL+'file/getImage?imageId='+imageId)
}  /********************************END**************************************/
 
contactList(superAdmin){
  return this.httpClient.get(APIURL+'driver/driverlist?superAdminId='+superAdmin)
}

}
