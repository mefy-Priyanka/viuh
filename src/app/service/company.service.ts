import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../UrlConfig'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private httpClient: HttpClient) { }

  // **************Create company****************
  createCompany(data){
    console.log(data);
    return this.httpClient.post(APIURL+ 'company/create', data)
  }
 /****************************FILE UPLOAD METHOD*****************************/
 fileUpload(data) {
  console.log('file data', data)
  return this.httpClient.post(APIURL+ 'file/upload', data);
}

createContractor(data){
  console.log(data);
  return this.httpClient.post(APIURL+ 'contractor/create', data)
}

fleetcreation(data){
  console.log(data);
  return this.httpClient.post(APIURL+ 'fleet/create', data)
}

  /***************************** GETTING LOGIN USER DETAIL ****************** */
  companyList(superAdmin) {
    return this.httpClient.get(APIURL + 'company/companyBySuperAdminId' ,superAdmin)
  }
  /********************************END**************************************/
    /***************************** GETTING LOGIN USER DETAIL ****************** */
    contractorList(userId) {
      return this.httpClient.get(APIURL + 'contractor/contractByUserId?userId='+userId)
    }
    /********************************END**************************************/
}
