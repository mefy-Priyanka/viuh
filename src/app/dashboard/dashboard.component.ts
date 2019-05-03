import { Component, OnInit } from '@angular/core';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public account: boolean = true;
  public fleet: boolean =false;
  public order: boolean =false;
  public contractorcreate: boolean =false;
  public user: boolean =false;
  public companycreate: boolean =false;
  constructor(private SharedService: SharedService) {
    this.SharedService.dashboardContent.subscribe(accountdata => {
      console.log(accountdata);
      if (accountdata == true) {
        this.account = true;
        this.fleet = false;
        this.order=false;
        this.contractorcreate=false;
        this.user=false;
        this.companycreate=false;
        console.log("show component");
      }
    })
    this.SharedService.fleetContent.subscribe(fleetdata => {
      console.log(fleetdata);
      if (fleetdata == true) {
        this.fleet = true;
        this.account = false;
        this.order=false;
        this.contractorcreate=false;
        this.user=false;
        this.companycreate=false;
        console.log("show component");
      }
    }),
    this.SharedService.orderContent.subscribe(orderdata => {
      console.log(orderdata);
      if (orderdata == true) {
        this.order=true;
        this.fleet = false;
        this.account = false;
        this.contractorcreate=false;
        this.user=false;
        this.companycreate=false;
        console.log("show component");
      }
    }),
    this.SharedService.contractorContent.subscribe(contractordata => {
      console.log(contractordata);
      if (contractordata == true) {
        this.contractorcreate=true;
        this.order=false;
        this.fleet = false;
        this.account = false;
        this.user=false;
        this.companycreate=false;
        console.log("show component");
      }
    }),
    this.SharedService.userContent.subscribe(userdata => {
      console.log(userdata);
      if (userdata == true) {
        this.user=true;
        this.contractorcreate=false;
        this.order=false;
        this.fleet = false;
        this.account = false;
        this.companycreate=false;
        console.log("show component");
      }
    }),
    this.SharedService.companyContent.subscribe(companydata => {
      console.log(companydata);
      if (companydata == true) {
        this.companycreate=true;
        this.user=false;
        this.contractorcreate=false;
        this.order=false;
        this.fleet = false;
        this.account = false;
        console.log("show component");
      }
    })
   }

  ngOnInit() {
  }

}
