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
    return this.httpClient.post(APIURL+'driver/create',data)
  }
  /********************************END**************************************/
/*****************************IMAGE PREVIEW**********************/
preview(imageId){
  return this.httpClient.get(APIURL+'file/getImage?imageId='+imageId)
}  /********************************END**************************************/
 /***************************************CREATE CUSTOMER*************************/
 customer(data){
  return this.httpClient.post(APIURL+'customer/create',data)
}
/********************************END**************************************/
/***************************************CREATE CUSTOMER*************************/
employee(data){
  return this.httpClient.post(APIURL+'employee/create',data)
}
/********************************END**************************************/
/***************************************CREATE CUSTOMER*************************/
vendor(data){
  return this.httpClient.post(APIURL+'vendor/create',data)
}
/********************************END**************************************/
driverList(superAdmin){
  return this.httpClient.get(APIURL+'driver/driverlist?superAdminId='+superAdmin)
}
customerList(superAdmin){
  return this.httpClient.get(APIURL+'customer/customerlist?superAdminId='+superAdmin)
}
employeeList(superAdmin){
  return this.httpClient.get(APIURL+'employee/employeelist?superAdminId='+superAdmin)
}
vendorList(superAdmin){
  return this.httpClient.get(APIURL+'vendor/vendorlist?superAdminId='+superAdmin)
}
}
