import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { ContactService } from '../service/contact.service';
import { CompanyService } from '../service/company.service';




@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  public loader: boolean;
  public currentURL: any;
  listContact: boolean = true;
  public contactList: any = [];
  public superAdminId = localStorage.getItem('SuperAdmin');
  constructor(private SharedService: SharedService, private contactService: ContactService,private CompanyService: CompanyService ) {
    this.currentURL = window.location.pathname;
    console.log('currentURL', this.currentURL)
  }
  addContact() {
    this.listContact = false;
    this.SharedService.abc('contactdetail');
    // this.SharedService.abc('contractordetail');
  }
   ngOnInit() {

    this.getContactlist();
  }
  /**********************DRIVER LIST BY SUPERADMIN*****************/
  getContactlist() {
    this.loader = true
    this.contactService.contactList(this.superAdminId).subscribe(result => {
      console.log('driverlist', result);
      this.loader = false;
      let value: any = {}
      value = result
      this.contactList = (value.result);
      console.log(this.contactList)
    },
      err => {
        this.loader = false;
        console.log('contactList err', err)
      })
  }
  /**********************END*****************/





  view(data) {
    if (data.contact_type == 'driver') {
      let data1 = {
        page: 'journal',
        data: data
      }
      this.SharedService.datatravel(data1);

      this.SharedService.abc('viewdriver');
    }
  }
  del(id) {
    var result = confirm("Want to delete?");
    if (result) {
    this.CompanyService.deletecontact(id).subscribe(result=>{
    console.log(result);
    this.getContactlist()
    },
    err=>{
      console.log(err)
    })}
  }
  /*****************************EDIT CONTACT***************/
  editContact(contact){
    console.log('contact detaail',contact)
    if(contact.contact_type=='driver'){
      console.log('contact driver')
      this.SharedService.contactDetail(contact)
      this.SharedService.abc('Driver')
    }
    else if(contact.contact_type=='customer'){
      console.log('contact Customer')
      this.SharedService.contactDetail(contact)
      this.SharedService.abc('Customer')

    }
    else if(contact.contact_type=='employee'){
      console.log('contact Employee')
      this.SharedService.contactDetail(contact)
      this.SharedService.abc('Employee')

    }
    else {
      console.log('contact vendor')
      contact.contact_type=='vendor'
      this.SharedService.contactDetail(contact)
      this.SharedService.abc('Vendor')

    }

  }
}
