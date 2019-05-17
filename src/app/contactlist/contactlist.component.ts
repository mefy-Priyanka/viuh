import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';


@Component({
  selector: 'app-contactlist',
  templateUrl: './contactlist.component.html',
  styleUrls: ['./contactlist.component.css']
})
export class ContactlistComponent implements OnInit {
  listContact: boolean=true;

  constructor(private SharedService: SharedService) { }
  addContact(){
    this.listContact=false;
    this.SharedService.abc('contactdetail');
    // this.SharedService.abc('contractordetail');

    console.log("hi t");
  }
  ngOnInit() {
  }

}
