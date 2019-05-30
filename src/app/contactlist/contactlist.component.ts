import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { ContactService } from '../service/contact.service';




@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  listContact: boolean = true;
  
  public driverList: any = [];
  public employeeList: any = [];
  public vendorList: any = [];
  public customerList: any = [];
  public superAdminId = localStorage.getItem('SuperAdmin');
  constructor(private SharedService: SharedService, private contactService: ContactService, ) {

  }
  addContact() {
    this.listContact = false;
    this.SharedService.abc('contactdetail');
    // this.SharedService.abc('contractordetail');
  }
  ngOnInit() {
this.getCustomerlist();
this.getEmployeelist();
this.getVendorlist();
this.getDriverlist();
  }
/**********************DRIVER LIST BY SUPERADMIN*****************/
  getDriverlist() {
    this.contactService.driverList(this.superAdminId).subscribe(result => {
      console.log('driverlist',result);
      let value:any={}
      value = result
      this.driverList = (value.result);
      console.log(this.driverList)
    },
      err => {
        console.log('driver err',err)
      })
  }
/**********************END*****************/
/**********************CUSTOMER LIST BY SUPERADMIN*****************/
getCustomerlist() {
  this.contactService.driverList(this.superAdminId).subscribe(result => {
    console.log('customerList',result);
    let value:any={}
    value = result
    this.customerList =value;
    console.log(this.customerList)
  },
    err => {
      console.log('customerList err',err)
    })
}
/**********************END*****************/
/**********************EMPLOYEELIST LIST BY SUPERADMIN*****************/
getEmployeelist() {
  this.contactService.employeeList(this.superAdminId).subscribe(result => {
    console.log('employeeList',result);
    let value:any={}
    value = result
    this.employeeList= (value.result);
    console.log(this.employeeList)
  },
    err => {
      console.log('employeeList err',err)
    })
}
/**********************END*****************/
/**********************VENDOR LIST BY SUPERADMIN*****************/
getVendorlist() {
  this.contactService.vendorList(this.superAdminId).subscribe(result => {
    console.log('vendorList',result);
    let value:any={}
    value = result
    this.vendorList = (value.result);
    console.log(this.vendorList)
  },
    err => {
      console.log('vendor err',err)
    })
}
/**********************END*****************/
}
