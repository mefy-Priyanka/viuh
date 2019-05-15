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

<<<<<<< HEAD


  userlist(id){
    return this.httpClient.get(APIURL + 'user/userBySuperAdmin?superAdminId='+id)

  }
  delete(id){
    return this.httpClient.delete(APIURL+'user/delete?userId='+id)
  }
=======
  /***************************** GET USERLIST BY SUPERADMIN ****************** */
  userlist(superAdminId: any) {
    return this.httpClient.get(APIURL + 'user/userBySuperAdmin?superAdminId=' + superAdminId)
  }
  /********************************END**************************************/



>>>>>>> 467dbac61924ffafb320f22ea079d794026b457e
}