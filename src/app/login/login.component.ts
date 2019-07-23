import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';
import { SharedService } from '../service/shared.service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userFormErrors: any;
  public userForm: FormGroup;
  public submitted: boolean = false;
  public loader: boolean
  constructor(private toastr: ToastrService, private formBuilder: FormBuilder, private router: Router, private userService: UserService, private SharedService: SharedService, ) {
    /*******ERRORS OF userForm ********* */
    this.userFormErrors = {
      email: {},
      password: {},
      organisation: {}
    };
    /********** ENDS ************** */

  }

  ngOnInit() {
    this.userForm = this.createLoginForm()
    this.userForm.valueChanges.subscribe(() => {
      this.onuserFormValuesChanged();
    });
  }
  /***********IT CATCHES ALL CHANGES IN FORM*******/
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
  /********** ENDS ************** */
  /********LOGIN FORM ********** */
  createLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      organisation: ['', Validators.required]

    });
  }
  /********** ENDS ************** */


  /********LOGIN ********* */
  login() {
    console.log(this.userForm.value);
    this.submitted = true;
    this.loader = true;
    if (this.userForm.valid) {
      this.submitted = false;
      let data = {
        email: this.userForm.value.email,
        password: this.userForm.value.password,
        organisation: this.userForm.value.organisation
      }
      console.log('data', data)
      this.userService.login(data).subscribe(value => {
        console.log('login', value);
        let result: any = {}
        result = value;
        if(result.user.role == 'superAdmin'){
          localStorage.setItem('SuperAdmin', result.user._id);
          console.log(localStorage.getItem('SuperAdmin'));
        }
        else{
          localStorage.setItem('SuperAdmin', result.user.superAdminId);
          console.log(localStorage.getItem('SuperAdmin'));
        }
        if (result.message == 'Invalid Credentials') {
          this.toastr.error('oops!', result.message)
        }
        else {

          

          this.toastr.success('Welcome!', 'Successfully Logged In'),
            localStorage.setItem('userId', result.user._id);
          localStorage.setItem('role', result.user.role);
          localStorage.setItem('organisation', result.user.organisation);
          localStorage.setItem('emailId', result.user.email);
          this.router.navigate(['/dashboard']);
        }
        this.loader = false;

      },
        err => {
          this.toastr.error('Error!', 'Login failed'),
            console.log('err', err.error)
          this.loader = false;
        })

    }
    else {
      this.loader = false;
    }

  }
  forgotpassword(){
    this.router.navigate(['/password']);

  }
  /********** ENDS ************** */
}