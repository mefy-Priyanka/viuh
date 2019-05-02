import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  public accountdata: boolean = true;
  public fleetdata: boolean = true;
  public orderdata: boolean = true;
  public contractordata: boolean = true;
  public userdata: boolean = true;
  public companydata: boolean = true;
  constructor(private SharedService: SharedService) { }
  accountdetail(){
    this.SharedService.dashboardtoggle(this.accountdata);
    console.log('Data sent');
  }
  fleetdetail(){
    this.SharedService.fleettoggle(this.fleetdata);
    console.log('Data sent');
  }
  orderdetail(){
    this.SharedService.ordertoggle(this.orderdata);
    console.log('Data sent');
  }
  contractordetail(){
    this.SharedService.contractortoggle(this.contractordata);
    console.log('Data sent');
  }
  userdetail(){
    this.SharedService.usertoggle(this.userdata);
    console.log('Data sent'); 
  }
  companydetail(){
    this.SharedService.companytoggle(this.companydata);
    console.log('Data sent'); 
  }
  ngOnInit() {
  }

}
