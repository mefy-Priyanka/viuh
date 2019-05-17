import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../UrlConfig'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  /*********************LOGIN API*****************************/
  login(data: any) {
    return this.httpClient.post(APIURL + 'user/login', data);
  }
  /********************************END**************************************/

  /***************************** GETTING LOGIN USER DETAIL ****************** */
  logininfo(userId: any) {
    return this.httpClient.get(APIURL + 'user/userById?userId=' + userId)
  }
  /********************************END**************************************/

  /***************************** CREATE USER BY SUPERADMIN  ****************** */
  createUser(data: any) {
    return this.httpClient.post(APIURL + 'user/userCreate', data)
  }
  /********************************END**************************************/



  userlist(id) {
    return this.httpClient.get(APIURL + 'user/userBySuperAdmin?superAdminId=' + id)

  }

  accounttypelist() {
    return this.httpClient.get(APIURL + 'account/accountType')

  }
  creataccount(data) {
    return this.httpClient.post(APIURL + 'account/create', data)

  }

  getaccountlist(id) {
    return this.httpClient.get(APIURL + 'account/accountByUserId?userId='+id)

  }
  getcontactlist(id) {
    return this.httpClient.get(APIURL + 'contact/contactByAdminId?adminId='+id)

  }
  
  creatcontact(data) {
    return this.httpClient.post(APIURL + 'contact/create', data)

  }

 
  delete(id) {
    return this.httpClient.delete(APIURL + 'user/delete?userId=' + id)
  }



  contactdelete(id){
    return this.httpClient.delete(APIURL+'contact/delete?contactId='+id)
  }
}