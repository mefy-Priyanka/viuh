import { Component, OnInit } from '@angular/core';
import {  FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { SharedService } from '../service/shared.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userFormErrors: any;
  public userForm: FormGroup;
  public submitted:boolean=false;
  public loader: boolean 
  constructor(private formBuilder: FormBuilder,private router: Router,private userService:UserService,private sharedService:SharedService,)
   { 
      /******************ERRORS OF userForm ********************** */
    this.userFormErrors = {
      email: {},
      password: {}
    };
    /****************************** ENDS **************************************** */

   }

  ngOnInit() {
    this.userForm = this.createLoginForm()
    this.userForm.valueChanges.subscribe(() => {
      this.onuserFormValuesChanged();
    });
  }
/******************************IT CATCHES ALL CHANGES IN FORM******************/
onuserFormValuesChanged() {
  for (const field in this.userFormErrors) {
    if (!this.userFormErrors.hasOwnProperty(field)) {
      continue;
    }
    // Clear previous errors
    this.userFormErrors[field] = {};
    // Get the control
    const control = this.userForm.get(field);

    if (control && control.dirty && !control.valid) {
      this.userFormErrors[field] = control.errors;
    }
  }
}
    /****************************** ENDS **************************************** */
 /***********************LOGIN FORM ***************************** */
    createLoginForm() {
      return this.formBuilder.group({
        email: ['',[ Validators.required,Validators.email]],
        password: ['', Validators.required]
       
      });
    }
    /****************************** ENDS **************************************** */

 
    /*************************LOGIN ********************** */
login(){
  console.log(this.userForm.value);
  this.submitted=true;
  this.loader = true;
  if(this.userForm.valid){  
    this.submitted=false;
    let data={
      email:this.userForm.value.email,
      password:this.userForm.value.password
    }
    this.userService.login(data).subscribe(value=>{
      console.log('login',value)
      let result:any={}
      result=value
      // this.sharedService.loginInfo(result)
      this.loader = false;
      localStorage.setItem('userId',result.user._id);
      localStorage.setItem('emailId',result.user.email);
      this.router.navigate(['/dashboard'])
    },
    err=>{
      console.log('err',err.error)
      this.loader = false;
    })

  }
  else{
    this.loader = false;
  }

}
    /****************************** ENDS **************************************** */

}
