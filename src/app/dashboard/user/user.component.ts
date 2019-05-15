import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ToastrService } from 'ngx-toastr';
import { SharedService } from '../../service/shared.service';
import * as moment from 'moment';

declare var $ :any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  createUserForm: FormGroup;
  createuserFormErrors: any;
  public allUserList:any=[];
  public loader: boolean = false;
  public adminId: any = {};
<<<<<<< HEAD
  public uModal: boolean = false;
  submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
  pass: any;
  userDetail: any;
  role: string;
  organisation: string;
  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private toastr: ToastrService) {
=======
   public submitted: boolean = false; //SHOW ERROR,IF INVALID FORM IS SUBMITTED
   public pass: any;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService, private SharedService: SharedService, ) {
>>>>>>> 467dbac61924ffafb320f22ea079d794026b457e
    this.adminId = localStorage.getItem('userId');
    this.role=localStorage.getItem('role');
    this.organisation=localStorage.getItem('organisation')
    this.createuserFormErrors = {
      name: {},
      email: {},
      password: {},
      organisation: {},
      role: {}
    };
  }

  getUserDetail(){
    this.loader=true;
    this.userService.userlist(localStorage.getItem('SuperAdmin')).subscribe(data=>{
      console.log(data)
      let result :any={}
      result=data;
      this.userDetail=result.result
      console.log(this.userDetail);
      this.loader=false;
    },
    error=>{
      console.log(error);
      this.loader=false;
      
    })
  }
     /********************END*******************************/

  ngOnInit() {
    this.createUserForm = this.createpersonForm()

    this.createUserForm.valueChanges.subscribe(() => {
      this.onUserFormValuesChanged();
    });
<<<<<<< HEAD
    this.getUserDetail();
=======
    this. userList()
>>>>>>> 467dbac61924ffafb320f22ea079d794026b457e
  }
  /******************************IT CATCHES ALL CHANGES IN FORM******************/
  onUserFormValuesChanged() {
    for (const field in this.createuserFormErrors) {
      if (!this.createuserFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.createuserFormErrors[field] = {};
      // Get the control
      const control = this.createUserForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.createuserFormErrors[field] = control.errors;
      }
    }
  }
  createpersonForm() {
    return this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      organisation: ['', Validators.required],
      role: ['', Validators.required]
    });
  }
  saveUser() {


    console.log(this.createUserForm.value)
    console.log(this.adminId)
    this.submitted = true;
    this.loader = true;
    if (this.createUserForm.valid) {
      this.submitted = false;
      this.pass = this.createUserForm.value.password;
      console.log("password", this.pass.length)
      if (this.pass.length < 6) {
        console.log("error password");
        window.alert('You have entered less than 6 characters for password');
      }
      let data = {
        name: this.createUserForm.value.name,
        email: this.createUserForm.value.email,
        password: this.createUserForm.value.password,
        superAdminId: this.adminId,
        organisation: this.createUserForm.value.organisation,
        role: this.createUserForm.value.role
      }
      console.log("data", data);

      this.userService.createUser(data).subscribe(value => {
        this.toastr.success('Congo!', 'Successfully Created'),
          console.log('user', value)
        let result: any = {}
        result = value;
       
        this.getUserDetail();

        this.createUserForm.reset();
        this.loader = false;

        // this.SharedService.abc('accountdetail');
      },
        err => {
          console.log(err)
          this.submitted = false;
          this.loader = false;
          this.toastr.error('Error!', 'Server Error')
          this.createUserForm.reset();
          $('#userModal').modal('hide');
          //initialize all modals
          // $('#userModal').closeModal();
        });
    }
  }
<<<<<<< HEAD


  delete(id){
    this.loader=true;
    this.userService.delete(id).subscribe(result=>{
      console.log('delete',result);
      this.getUserDetail();
      this.loader=false
    },
    err=>{
      console.log(err);
      this.loader=false;
    });
    
  }
=======
  /***************************** GET USERLIST BY SUPERADMIN ****************** */
  userList(){
    this.userService.userlist( this.adminId).subscribe(data=>{
      let result:any={}
      result=data
      this.allUserList=result.result;
      console.log('alluserlist',this.allUserList)
    },err=>{
      console.log(err)
    })
  }
  /********************************END**************************************/


>>>>>>> 467dbac61924ffafb320f22ea079d794026b457e
}
