import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {
  public bank: boolean = true;
  public bankList: boolean = true;
  bankFormErrors: {};
  bankForm: FormGroup;
  submitted: boolean;
  orders = []
  userId: string;
  banklist = []
  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');

    this.bankFormErrors = {
      bank_name: {},
      ifsc: {},
      account_holder_name: {},
      branch_name: {},
      address: {},
      account_number: {},
      // consirmacn:{},

    };
  }

  ngOnInit() {
    this.bankForm = this.createbankForm()

    this.bankForm.valueChanges.subscribe(() => {
      this.onbankFormValuesChanged();
    });
    this.getbanklist()
  }

  getbanklist() {
    let something: any;
    this.userService.banklist(this.userId).subscribe(value => {

      // this.toastr.success('Congo!', 'account get Successfully '),
      console.log('list', value)
      something = value;
      this.banklist = something.result
    },
      err => {
        console.log(err)

      })
  }
  createbankForm() {
    return this.formBuilder.group({
      bank_name: ['', Validators.required],
      ifsc: ['', Validators.required],
      account_holder_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      address: ['', Validators.required],
      account_number: ['', Validators.required],
      // consirmacn: ['', Validators.required],
    });


  }

  onbankFormValuesChanged() {
    for (const field in this.bankFormErrors) {
      if (!this.bankFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.bankFormErrors[field] = {};
      // Get the control
      const control = this.bankForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.bankFormErrors[field] = control.errors;
      }
    }
  }
  submit1() {
    console.log(this.bankForm.value);
    this.submitted = true;
    if (this.bankForm.valid) {
      console.log('let data be', this.bankForm);
      this.submitted = false;
      this.bank = !this.bank;
    }
  }
  submit() {
    let something: any;
    let data = {
      bank_name: this.bankForm.value.bank_name,
      branch_name: this.bankForm.value.branch_name,
      account_holder_namet: this.bankForm.value.account_holder_name,
      ifsc: this.bankForm.value.account_number,
      account_number: this.bankForm.value.account_number,
      address: this.bankForm.value.address,
      userId: this.userId,
      format: this.orders
    }

    console.log(data);
    this.userService.bankcreat(data).subscribe(value => {

      console.log('', value)
      something = value;
      this.creataccount()

    },
      err => {
        console.log(err)

      })

  }
  cancel() {
    this.bank = !this.bank
  }
  add() {
    let temp = {
      field_name: '',
      field_type: '',
      description: ''
    };
    this.orders.push(temp)
  }

  listBank() {
    this.bankList = !this.bankList;
  }


  creataccount() {

    let data = {
      accountName: this.bankForm.value.bank_name,
      accountType: "Asset",
      description: "description",
      // accountCode: this.bankForm.value.account_number,
      organisation: localStorage.getItem('organisation'),
      userId: this.userId,
      parentAccount: "Bank",
      super_parent_Account:''
    }

    console.log('let data be', data);
    this.userService.creataccount(data).subscribe(value => {
      this.toastr.success('Congo!', 'account Successfully Created'),
        console.log('user', value)
      let result: any = {}
      result = value
      console.log(result)
      this.getbanklist()
      this.listBank();
      this.toastr.success('Awesome!', 'Bank created successfully')

    },
      err => {
        console.log(err)

        this.toastr.error('Error!', 'Server Error')
      })
  }
}














