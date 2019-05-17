import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';
import { UserService } from '../service/user.service';




@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  listContact: boolean = true;
  userId: string;
  contactlist: any = [];

  constructor(private SharedService: SharedService, private userService: UserService, ) {
    this.userId = localStorage.getItem('userId');

  }
  addContact() {
    this.listContact = false;
    this.SharedService.abc('contactdetail');
    // this.SharedService.abc('contractordetail');

    console.log("hi t");
  }
  ngOnInit() {
    this.getcontactlist();
  }

  getcontactlist() {

    let something: any;
    this.userService.getcontactlist(this.userId).subscribe(result => {
      console.log(result);
      something = result
      this.contactlist = (something.result);
      console.log(this.contactlist)
    },
      err => {
        console.log(err)
      })
  }
  delete(id) {
    this.userService.contactdelete(id).subscribe(result => {
      console.log(result);
      this.getcontactlist();
    }, err => {
      console.log(err);
    })
  }
}
