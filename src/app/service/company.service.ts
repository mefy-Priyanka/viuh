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
getfleetlist(id){
  return this.httpClient.get(APIURL + 'fleet/fleetlist?superAdminId='+id)

}
deletefleet(id){
return this.httpClient.delete(APIURL+'fleet/delete?fleetId='+id)
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




    periodList(superAdmin) {
      
      
      return this.httpClient.get(APIURL + 'period/periodList?superAdminId=' +superAdmin)

    }

    creatperiod(data){
      return this.httpClient.post(APIURL+ 'period/create', data)

    }
// *****************************************Destination***********************************************
destination(id) {
  return this.httpClient.get(APIURL + 'contact/listByContactType?superAdminId='+id.superAdminId+'&contact_type='+id.contact_type)
}
destinationCreate(data) {
  return this.httpClient.post(APIURL+ 'destination/create', data)
console.log("gotdata",data)
}
destinationList(id) {
  return this.httpClient.get(APIURL + 'destination/destinationList?superAdminId='+id.superAdminId)
}
// // *****************************************Destination End****************************************************************************************Destination***********************************************



// route
creatroute(data){
  return this.httpClient.post(APIURL+ 'routes/create', data)

}
getroute(id){
  return this.httpClient.get(APIURL+ 'routes/routeslist?superAdminId='+id)

}
// route end


// petrol form

creatpetrom(data){
  return this.httpClient.post(APIURL+ 'routes/createc', data)


}

// petrol form end
}
