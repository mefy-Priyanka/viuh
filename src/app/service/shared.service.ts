import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  abcd:BehaviorSubject<any> = new BehaviorSubject({});
  somedata:BehaviorSubject<any> = new BehaviorSubject({});

  constructor() { }
  abc(params){
    this.abcd.next(params)  
    console.log("hi there");
  }

  datatravel(params){
    this.somedata.next(params)  
    console.log(params);
  }
}
