import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { resource } from 'selenium-webdriver/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  userId: string;
  role: string;
  organisation: string;
  accountFormErrors: {};
  accountypelist = [];
  accountForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  accountlist=[];
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    this.organisation = localStorage.getItem('organisation');

    this.accountFormErrors = {
      accountName: {},
      accountTypeId: {},
      name: {},
      description: {},
      accountCode: {},
    };
  }


  createAccountForm() {
    return this.formBuilder.group({
      accountName: ['', Validators.required],
      accountTypeId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      accountCode: ['', Validators.required],
    });
  }

  onaccountFormValuesChanged() {
    for (const field in this.accountFormErrors) {
      if (!this.accountFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.accountFormErrors[field] = {};
      // Get the control
      const control = this.accountForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.accountFormErrors[field] = control.errors;
      }
    }
  }


  getaccountlist() {
console.log('getting all account')
    let something: any;
    this.userService.getaccountlist(this.userId).subscribe(result => {
      console.log(result);
      something = result
      this.accountlist = (something.result);
      console.log(this.accountlist)
    },
      err => {
        console.log(err)
      })
  }


  ngOnInit() {
    this.getaccounttype();
    this.getaccountlist();
    this.accountForm = this.createAccountForm()
    this.accountForm.valueChanges.subscribe(() => {
      this.onaccountFormValuesChanged();
    });
  }


  submit() {
    console.log(this.accountForm.value)
    this.submitted = true;
    this.loader = true;
    if (this.accountForm.valid) {
      let data = {
        accountName: this.accountForm.value.accountName,
        accountTypeId: this.accountForm.value.accountTypeId,
        name: this.accountForm.value.name,
        description: this.accountForm.value.description,
        accountCode: this.accountForm.value.accountCode,
        organisation: this.organisation,
        userId: this.userId

      }
      console.log('let data be', data);
      this.userService.creataccount(data).subscribe(value => {
        this.submitted = false;
        this.toastr.success('Congo!', 'account Successfully Created'),
          console.log('user', value)
        let result: any = {}
        result = value
        this.accountForm.reset();
        this.loader = false;;
        this.getaccountlist();
        location.reload();
      },
        err => {
          console.log(err)
          this.submitted = false;
          this.loader = false;
          this.toastr.error('Error!', 'Server Error')
          this.accountForm.reset();
        })
      console.log("data", data);
    }
    this.getaccountlist();
  }



  getaccounttype() {
    let something: any;
    this.userService.accounttypelist().subscribe(result => {
      console.log(result);
      something = result
      this.accountypelist = (something.result);
      console.log(this.accountypelist)
    },
      err => {
        console.log(err)
      })
  }
}
