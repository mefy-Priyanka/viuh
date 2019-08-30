import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  abcd:BehaviorSubject<any> = new BehaviorSubject({});
  somedata:BehaviorSubject<any> = new BehaviorSubject({});
  contactData:BehaviorSubject<any> = new BehaviorSubject({});





  constructor() { }
  abc(params){
    this.abcd.next(params)  
    console.log("for routing)");
  }

  datatravel(params){
    this.somedata.next(params)  
    console.log(params);
  }
  /**************STORE CONTACT DETAIL BY CLICKING ON EDIT **************/
  contactDetail(params){
    this.contactData.next(params)  
    console.log('shared data',params);
  }
}
