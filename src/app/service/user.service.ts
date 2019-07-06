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
  getaccountlist1(id) {
    // return this.httpClient.get(APIURL + 'account/accountByUserId?userId='+id);
    return this.httpClient.get(APIURL + 'account/accountBySuperAdminId?superAdminId='+id)

  }
  getaccountlist(id) {
    // return this.httpClient.get(APIURL + 'account/accountByUserId?userId='+id);
    return this.httpClient.get(APIURL + 'account/accountType?parentAccount='+'')

  }

  delete(id) {
    return this.httpClient.delete(APIURL + 'user/delete?userId=' + id)
  }


  getlistbyparent(data){
    return this.httpClient.get(APIURL + 'account/accountByParent?parentAccount='+data.parent+'&super_parent_Account='+data.super_parent_Account+'&superAdminId='+data.id)

  }


  bankcreat(data){
    return this.httpClient.post(APIURL + 'bank/create', data)

  }
  banklist(id){
    return this.httpClient.get(APIURL + 'bank/banklist?superAdminId='+id)

  }




  journalcreat(data){
    console.log('dkfgdhzjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjg',data)
    return this.httpClient.post(APIURL + 'journal/create',data)
  }
  journaldraft(data){
    return this.httpClient.post(APIURL + 'journal/draft',data);

  }
  journalList(id){
    return this.httpClient.get(APIURL + 'journal/journalList?superAdminId='+id)

  }




  consignmentcreat(data){
    return this.httpClient.post(APIURL+'consignment/create',data);
  }

  consignmentList(id){
    return this.httpClient.get(APIURL + 'consignment/consignmentList?superAdminId='+id)
  }



// invoice


creatinvoice(data){
  return this.httpClient.post(APIURL+'invoice/create',data)
}
// end invoice
// bill


createbill(data){
  return this.httpClient.post(APIURL+'bill/create',data)
}
// end bill



// account for customer,vender etc
accountbytype(data){
  console.log(APIURL + 'account/accountDetail?accountName='+data.account+'&accountType='+data.accounttype+'&parentAccount='+data.parent+'&superAdminId='+data.superAdminId)
  return this.httpClient.get(APIURL + 'account/accountDetail?accountName='+data.account+'&accountType='+data.accounttype+'&parentAccount='+data.parent+'&superAdminId='+data.superAdminId)
}

/*******************DELETE ACCOUNT BY ACCOUNTID***********************/
deleteAccount(accountId){
  return this.httpClient.delete(APIURL + 'account/delete?accountId='+accountId)
}

/*****************GET ACCOUNT LIST BY PARENT ACCOUNTNAME AND ACCOUNT TYPE */
// getAccountDetail(parentAccount,accountType){
//   return this.httpClient.get(APIURL + 'account/accountType?parentAccount='+parentAccount + '&accountType=' +accountType)
// }
}
