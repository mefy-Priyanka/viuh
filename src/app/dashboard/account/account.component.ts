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
  accountypelist = [];
  accountForm: FormGroup;
  submitted: boolean;
  loader: boolean;
  accountlist = [];

  parent = '';

  assets = [];
  liabilities = [];
  equity = [];
  revenue = [];
  expenses = [];
  parentbool: boolean = false;
  childbool: boolean = false;
  acnttype: any;
  levelteoacnt = [];
  accountlist1 = [];
  superparent = '';
  accountFormErrors: { accountName: any; parent: any; description: any; };

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');
    this.role = localStorage.getItem('role');
    this.organisation = localStorage.getItem('organisation');

    this.accountFormErrors = {
      accountName: {},
      parent: {},

      description: {}
      // accountCode: {},
    };
  }

  createAccountForm() {
    return this.formBuilder.group({
      accountName: ['', Validators.required],
      parent: ['', Validators.required],
      description: ['', Validators.required],
      // accountCode: ['', Validators.required],
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

  empty() {
    this.equity = [];
    this.expenses = [];
    this.assets = [];
    this.revenue = [];
    this.liabilities = [];
  }

  getaccountlist1() {
    let i = 0;
    this.empty()
    console.log('getting all account superadmin')
    let something: any;
    this.userService.getaccountlist1(localStorage.getItem('SuperAdmin')).subscribe(result => {
      console.log(result);
      something = result
      this.accountlist1 = (something.result);

      console.log(this.accountlist1);

      this.accountlist = (something.result);
      if (this.accountlist.length != 0 ) {
        for (i = 0; i < this.accountlist.length; i++) {
          if (this.accountlist[i].accountType == "Asset" && this.accountlist[i].parentAccount==null) {
            this.assets.push(this.accountlist[i].accountName)
          }
          if (this.accountlist[i].accountType == "Equity" && this.accountlist[i].parentAccount==null) {
            this.equity.push(this.accountlist[i].accountName)
          }
          if (this.accountlist[i].accountType == "Expense" && this.accountlist[i].parentAccount==null) {
            this.expenses.push(this.accountlist[i].accountName)
          }
          if (this.accountlist[i].accountType == "Revenue" && this.accountlist[i].parentAccount==null) {
            this.revenue.push(this.accountlist[i].accountName)
          }
          if (this.accountlist[i].accountType == "Liability" && this.accountlist[i].parentAccount==null) {
            this.liabilities.push(this.accountlist[i].accountName)
          }
        }
      }
      console.log(this.assets,this.expenses,  this.revenue, this.liabilities,this.equity, )

    },
      err => {
        console.log(err)
      })
  }


  getaccountlist() {
    let i = 0;
    this.empty()
    console.log('getting all account')
    let something: any;
    this.userService.getaccountlist(this.userId).subscribe(result => {
      console.log(result);
      something = result
      this.accountlist = (something.result);

      console.log(this.accountlist);


    },
      err => {
        console.log(err)
      })
  }


  inputcheck(event) {
    this.accountForm.reset();
    console.log(event);
    this.parentbool = event.currentTarget.checked;
    this.childbool = false;
    this.accountForm.value.parent = ''
  }


  inputcheck1(event) {

    console.log(this.accountForm.value.parent, this.superparent)

    let something: any;
    this.childbool = event.currentTarget.checked;
    if (event.currentTarget.checked) {
      this.superparent = this.accountForm.value.parent
      console.log('parent account name', this.accountForm.value.parent);

      if (this.accountForm.value.parent !== '') {
        console.log(this.accountForm.value.parent);
        let data = {
          parent: this.accountForm.value.parent,
          id: localStorage.getItem('SuperAdmin'),
          super_parent_Account: this.superparent
        }
        this.userService.getlistbyparent(data).subscribe(value => {

          this.toastr.success('Congo!', 'account get Successfully '),
            console.log('list', value)
          something = value;
          this.levelteoacnt = something.result;
        },
          err => {
            console.log(err)

          })
      }
    }
    else {
      this.superparent = ''
    }
  }
  isCherries(fruit) {
    return fruit.name === 'cherries';
  }
  selecttype() {

    console.log(this.accountForm.value.parent);
    this.acnttype = this.accountlist.find(x => x.accountName == this.accountForm.value.parent).accountType;
    console.log(this.acnttype)

  }
  getparent() {
    // let something: any;
    // this.userService.parentlist().subscribe(result => {
    //   console.log(result);
    //   something = result
    //   this.accountypelist = (something.result);
    //   console.log(this.accountypelist);
    // },
    //   err => {
    //     console.log(err)
    //   })
  }

  ngOnInit() {
    this.getparent();
    // this.getaccountlist();
    this.getaccountlist1();
    this.accountForm = this.createAccountForm()
    this.accountForm.valueChanges.subscribe(() => {
      this.onaccountFormValuesChanged();
    });
  }


  submit() {
    this.submitted = true;
    this.loader = true;
    var accounttype: any;
    accounttype = this.acnttype;
    if (this.accountForm.valid) {
      if (this.parentbool) {
        accounttype = this.accountForm.value.parent;
        this.accountForm.value.parent = ''
      }
      let data = {
        accountName: this.accountForm.value.accountName,
        accountType: accounttype,
        description: this.accountForm.value.description,
        // accountCode: this.accountForm.value.accountCode,
        organisation: this.organisation,
        userId: this.userId,
        parentAccount: this.accountForm.value.parent,
        super_parent_Account: this.superparent
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
        this.getaccountlist1();

        this.toastr.success('Awesome!', 'Account created successfully')
        document.getElementById('cancel').click()
      },
        err => {
          console.log(err)
          this.submitted = false;
          this.loader = false;
          this.toastr.error('Error!', 'Server Error')
          this.accountForm.reset();
        })
    }
    // this.getaccountlist();
    this.getaccountlist1();
  }



}
