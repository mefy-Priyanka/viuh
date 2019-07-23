import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {

  constructor() { }
public email: boolean = true;
public password: boolean ;
public otp: boolean ;
  ngOnInit() {
  }
  nextpaswd(){
    this.email=false;
    this.password=true;
    this.otp=false;
  }
  nextotp(){
    this.email=false;
    this.password=false;
    this.otp= true;
  }
}
