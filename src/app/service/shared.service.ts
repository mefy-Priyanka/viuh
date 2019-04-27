import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  loginInfo: BehaviorSubject<any> = new BehaviorSubject({});
  constructor() { }


   /********* save details of login USER ***********/
   saveLoginDetail(data) {
    this.loginInfo.next(data);
  }
}
