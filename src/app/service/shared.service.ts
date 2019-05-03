import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  dashboardContent:BehaviorSubject<any> = new BehaviorSubject({});
  fleetContent:BehaviorSubject<any> = new BehaviorSubject({});
  orderContent:BehaviorSubject<any> = new BehaviorSubject({});
  contractorContent:BehaviorSubject<any> = new BehaviorSubject({});
  userContent:BehaviorSubject<any> = new BehaviorSubject({});
  companyContent:BehaviorSubject<any> = new BehaviorSubject({});



  constructor() { }
  dashboardtoggle(params){
    this.dashboardContent.next(params)  
    console.log("hi");
  }
  fleettoggle(params){
    this.fleetContent.next(params)  
    console.log("hi");
  }
  ordertoggle(params){
    this.orderContent.next(params)  
    console.log("hi");
  }
  contractortoggle(params){
    this.contractorContent.next(params)  
    console.log("hi");
  }
  usertoggle(params){
    this.userContent.next(params)  
    console.log("hi");
  }
  companytoggle(params){
    this.companyContent.next(params)  
    console.log("hi");
  }

}
