import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { APIURL } from '../UrlConfig'

@Injectable({
  providedIn: 'root'
})
export class CompanyService {


  constructor(private httpClient: HttpClient) { }

  // **************Create company****************
  createCompany(data) {
    console.log(data);
    return this.httpClient.post(APIURL + 'company/create', data)
  }
  /****************************FILE UPLOAD METHOD*****************************/
  fileUpload(data) {
    console.log('file data', data)
    return this.httpClient.post(APIURL + 'file/upload', data);
  }

  createContractor(data) {
    console.log(data);
    return this.httpClient.post(APIURL + 'contractor/create', data)
  }
  updateContractor(data) {
    console.log(data);
    return this.httpClient.put(APIURL + 'contractor/update', data)
  }
  deletecontractor(id){
    return this.httpClient.delete(APIURL + 'contractor/delete?contractorId=' + id)
  }
  deletecontact(id){
    return this.httpClient.delete(APIURL + 'contact/delete?contactId=' + id)
  }
  fleetcreation(data) {
    console.log(data);
    return this.httpClient.post(APIURL + 'fleet/create', data)
  }
  fleetedit(data) {
    console.log(data);
    return this.httpClient.put(APIURL + 'fleet/update', data)
  }
  getfleetlist(id) {
    return this.httpClient.get(APIURL + 'fleet/fleetlist?superAdminId=' + id)

  }
  deletefleet(id) {
    return this.httpClient.delete(APIURL + 'fleet/delete?fleetId=' + id)
  }

  /***************************** GETTING LOGIN USER DETAIL ****************** */
  companyList(superAdmin) {
    console.log(APIURL + 'company/companyBySuperAdminId?superAdminId='+ superAdmin)
    return this.httpClient.get(APIURL + 'company/companyBySuperAdminId?superAdminId='+ superAdmin)
  }
  /********************************END**************************************/
  /***************************** GETTING LOGIN USER DETAIL ****************** */
  contractorList(userId) {
    return this.httpClient.get(APIURL + 'contractor/contractByUserId?userId=' + userId)
  }
  /********************************END**************************************/




  periodList(superAdmin) {


    return this.httpClient.get(APIURL + 'period/periodList?superAdminId=' + superAdmin)

  }

  creatperiod(data) {
    return this.httpClient.post(APIURL + 'period/create', data)

  }
  // *****************************************Destination***********************************************
  destination(id) {
    return this.httpClient.get(APIURL + 'contact/listByContactType?superAdminId=' + id.superAdminId + '&contact_type=' + id.contact_type)
  }
  destinationCreate(data) {
    return this.httpClient.post(APIURL + 'destination/create', data)
    console.log("gotdata", data)
  }
  destinationList(id) {
    return this.httpClient.get(APIURL + 'destination/destinationList?superAdminId=' + id.superAdminId)
  }
  deletedestination(id) {
    return this.httpClient.delete(APIURL + 'destination/delete?destinationId=' + id)
  }
  // // *****************************************Destination End****************************************************************************************Destination***********************************************



  // route
  creatroute(data) {
    return this.httpClient.post(APIURL + 'routes/create', data)

  }
  getroute(id) {
    return this.httpClient.get(APIURL + 'routes/routeslist?superAdminId=' + id)

  }
  // route end


  // petrol form

  creatpetrom(data) {
    return this.httpClient.post(APIURL + 'diesel/create', data)
  }

  // petrol form end







  getcontact(id) {
    return this.httpClient.get(APIURL + 'contact/contactlist?superAdminId=' + id)
  }
  getvendor(data) {
    return this.httpClient.get(APIURL + 'contact/listByContactType?superAdminId=' + data.id + '&contact_type=' + data.contact_type)
  }
  // driver get


  getdriver(data) {
    return this.httpClient.get(APIURL + 'contact/listByContactType?superAdminId=' + data.id + '&contact_type=' + data.contact_type)
  }

  getcustomer(data) {
    return this.httpClient.get(APIURL + 'contact/listByContactType?superAdminId=' + data.id + '&contact_type=' + data.contact_type)
  }

  // diesel creat daily
  creatdiesel(data) {
    return this.httpClient.post(APIURL + 'diesel/petrolPrice', data)
  }
  getdiesel(id) {
    return this.httpClient.get(APIURL + 'diesel/petrolList?superAdminId=' +id)
  }

  // 
  // diesel creat daily end

  creatworkorder(data){
    return this.httpClient.post(APIURL + 'order/create', data)

  }
  getworkorder(id){
    return this.httpClient.get(APIURL + 'order/orderList?superAdminId=' +id)

  }

  creattender(data){
    return this.httpClient.post(APIURL + 'company/tender', data)
  }

  
  // get invoice list
  getinvoice(id){
    return this.httpClient.get(APIURL+'invoice/invoiceList?superAdminId='+id)
  }

  // putinvoice
  paidinvoice(data){
    return this.httpClient.put(APIURL+'invoice/paid',data)
  }
  invoiceupdate(data){
    return this.httpClient.put(APIURL+'invoice/invoiceUpdate',data)

  }

  // bill
  getbill(id){
    return this.httpClient.get(APIURL+'bill/billList?superAdminId='+id)
  }
  paybill(data){
    return this.httpClient.put(APIURL+'bill/paid',data)
  }

  // voucher payment
  getpayvoucher(id){
    return this.httpClient.get(APIURL+'payment/paymentList?superAdminId='+id)

  }
  // destinationby customer id4\

  getdestination(id){
    return this.httpClient.get(APIURL+'destination/destinationByCustomer?customerId='+id)

  }

//get billlist
getdashboardbill(data){
  console.log(APIURL+'bill/billBetweenDate?superAdminId='+data.superAdminId+'&from='+data.from)
  return this.httpClient.get(APIURL+'bill/billBetweenDate?superAdminId='+data.superAdminId+'&from='+data.from)

}
//get fleetlist
getdashfleet(data){
  console.log(APIURL+'fleet/fleetBetweenDate?superAdminId='+data.superAdminId+'&to='+data.to)
  return this.httpClient.get(APIURL+'fleet/fleetBetweenDate?superAdminId='+data.superAdminId+'&to='+data.to)

}
//get consignmentlist
getdashconsign(data){
  console.log(APIURL+'consignment/consignmentBetweenDate?superAdminId='+data.superAdminId+'&from='+data.from)
  return this.httpClient.get(APIURL+'consignment/consignmentBetweenDate?superAdminId='+data.superAdminId+'&from='+data.from)

}
//get invoicelist
getdashinvoice(data){
  console.log(APIURL+'invoice/invoiceBetweenDate?superAdminId='+data.superAdminId+'&from='+data.from)
  return this.httpClient.get(APIURL+'invoice/invoiceBetweenDate?superAdminId='+data.superAdminId+'&from='+data.from)

}
}
