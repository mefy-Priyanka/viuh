import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { ContactService } from '../service/contact.service';




@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  public loader: boolean;
  public currentURL:any;
  listContact: boolean = true;
  public contactList: any = [];
  public superAdminId = localStorage.getItem('SuperAdmin');
  constructor(private SharedService: SharedService, private contactService: ContactService, ) {
    this.currentURL = window.location.pathname;
    console.log('currentURL',this.currentURL)
  }
  addContact() {
    this.listContact = false;
    this.SharedService.abc('contactdetail');
    // this.SharedService.abc('contractordetail');
  }  ngOnInit() {

this.getContactlist();
  }
/**********************DRIVER LIST BY SUPERADMIN*****************/
  getContactlist() {
    this.loader=true
    this.contactService.contactList(this.superAdminId).subscribe(result => {
      console.log('driverlist',result);
      this.loader=false;
      let value:any={}
      value = result
      this.contactList = (value.result);
      console.log(this.contactList)
    },
      err => {
      this.loader=false;
        console.log('contactList err',err)
      })
  }
/**********************END*****************/
}
