import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-paymentvoucher',
  templateUrl: './paymentvoucher.component.html',
  styleUrls: ['./paymentvoucher.component.css']
})
export class PaymentvoucherComponent implements OnInit {
  denomFormErrors: { note10: {}; note20: {}; note50: {}; note100: {}; note200: {}; note500: {}; note2000: {}; };
  denomForm: any;
  payForm: any;
  total: number;
  denom = [];
  payFormErrors: { to: {}; truck: {}; date: {}; paytype: {}; bank: {}; amount: {}; };
  contactlist = [];
  fleetDetail = [];
  trucknumber = '';
  bankselect: boolean = true;
  checkno = ''
  banklist = [];
  paymode = 'bank'
  truckarray = [];
  constructor(private formBuilder: FormBuilder, private userService: UserService,
    private SharedService: SharedService, private toastr: ToastrService, private companyService: CompanyService) {
    this.denomFormErrors = {
      note10: {},
      note20: {},
      note50: {},
      note100: {},
      note200: {},
      note500: {},
      note2000: {},
    };
    this.payFormErrors = {
      to: {},
      truck: {},

      date: {},
      paytype: {},
      bank: {},
      amount: {},
    };
  }

  ngOnInit() {
    this.denomForm = this.createAccountForm()
    this.denomForm.valueChanges.subscribe(() => {
      this.onaccountFormValuesChanged();
    });

    this.payForm = this.createpayForm()
    this.payForm.valueChanges.subscribe(() => {
      this.onpayFormValuesChanged();
    });
    this.getcontact()
    this.getfleetList();
    this.getbanklist()
  }



  getbanklist() {
    let something: any;
    this.userService.banklist(localStorage.getItem('userId')).subscribe(value => {

      // this.toastr.success('Congo!', 'account get Successfully '),
      console.log('list', value)
      something = value;
      this.banklist = something.result
    },
      err => {
        console.log(err)

      })
  }

  getfleetList() {
    this.companyService.getfleetlist(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.fleetDetail = result.result
      for (var i = 0; i < this.fleetDetail.length; i++) {
        console.log(i)
        if (this.fleetDetail[i].contractId == null) {
          this.fleetDetail.splice(i, 1);
          i = i - 1;
        }
        console.log(this.fleetDetail);

      }
    },
      error => {
        console.log(error);

      })
  }

  getcontact() {

    this.companyService.getcontact(localStorage.getItem('SuperAdmin')).subscribe(result => {
      console.log(result);
      let sometihng: any = result;
      this.contactlist = sometihng.result;
    },
      err => {
        console.log(err)
      })
  }


  onaccountFormValuesChanged() {
    console.log(this.denomForm.value);
    this.total =
      this.denomForm.value.note10 * 10 +
      this.denomForm.value.note20 * 20 +
      this.denomForm.value.note50 * 50 +
      this.denomForm.value.note100 * 100 +
      this.denomForm.value.note200 * 200 +
      this.denomForm.value.note500 * 500 +
      this.denomForm.value.note2000 * 2000;
  }
  createpayForm() {
    return this.formBuilder.group({
      to: ['', Validators.required],
      truck: ['', Validators.required],
      date: ['', Validators.required],
      paytype: ['', Validators.required],
      bank: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  onpayFormValuesChanged() {
    for (const field in this.payFormErrors) {
      if (!this.payFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.payFormErrors[field] = {};
      // Get the control
      const control = this.payForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.payFormErrors[field] = control.errors;
      }
    }
  }

  createAccountForm() {
    return this.formBuilder.group({
      note10: [0,],
      note20: [0,],
      note50: [0,],
      note100: [0,],
      note200: [0,],
      note500: [0,],
      note2000: [0,],
    });
  }

  removeitem() {
    if (this.denomForm.value.note10 != 0) {
      let some = {
        type: 10,
        count: this.denomForm.value.note10,
        amount: this.denomForm.value.note10 * 10,
      }
      this.denom.push(some)
    }
    if (this.denomForm.value.note20 != 0) {
      let some = {
        type: 20,
        count: this.denomForm.value.note20,
        amount: this.denomForm.value.note20 * 20,
      }
      this.denom.push(some)
    }
    if (this.denomForm.value.note50 != 0) {
      let some = {
        type: 50,
        count: this.denomForm.value.note50,
        amount: this.denomForm.value.note50 * 50,
      }
      this.denom.push(some)
    }
    if (this.denomForm.value.note100 != 0) {
      let some = {
        type: 100,
        count: this.denomForm.value.note100,
        amount: this.denomForm.value.note100 * 100,
      }
      this.denom.push(some)
    }
    if (this.denomForm.value.note200 != 0) {
      let some = {
        type: 200,
        count: this.denomForm.value.note200,
        amount: this.denomForm.value.note200 * 200,
      }
      this.denom.push(some)
    }
    if (this.denomForm.value.note500 != 0) {
      let some = {
        type: 500,
        count: this.denomForm.value.note500,
        amount: this.denomForm.value.note500 * 500,
      }
      this.denom.push(some)
    }
    if (this.denomForm.value.note2000 != 0) {
      let some = {
        type: 2000,
        count: this.denomForm.value.note2000,
        amount: this.denomForm.value.note2000 * 2000,
      }
      this.denom.push(some)
    }

    console.log(this.denom)

  }

  submitmodel() {
    this.denom = []
    this.removeitem();
    if (this.denom.length == 0) {
      alert('nothing selected');
      return;
    }
    else {
      this.denom = []
      this.removeitem();

      document.getElementById("cancels").click();
    }
    console.log(this.total)
  }


  checkValue(value) {


  }


  cancelmodel() {
    this.paymode = 'bank'
    this.bankselect = true;
    console.log('cancle model')
  }



  changeto(value) {
    console.log(value);
    this.truckarray = [];
    for (var i = 0; i < this.fleetDetail.length; i++) {
      if (this.fleetDetail[i].contractId._id == value) {
        console.log(i, this.fleetDetail[i].contractId._id, value)
        this.payForm.value.truck = this.fleetDetail[i]._id;
        this.trucknumber = this.fleetDetail[i].truck_number;

        let data = {
          fleetid: this.fleetDetail[i]._id,
          truckno: this.fleetDetail[i].truck_number
        }
        this.truckarray.push(data)
      }
      else {
        this.payForm.value.truck = null;
        this.trucknumber = ''
      }
    }

  }

  changemode(val) {
    if (val != 'bank') {
      this.payForm.value.bank = ''
      this.bankselect = false;
    }
    else if (val == 'bank') {
      this.bankselect = true;
      this.checkno = '';
      this.denomForm.reset()
    }

    if (val == 'cash') {
      document.getElementById("models").click();
    }

  }
  submit() {
    // this.changemode(this.payForm.value.paymode)
    console.log(this.payForm.value)

    let data = {
      contactId: this.payForm.value.to,
      payment_date: this.payForm.value.date,
      payment_mode: this.paymode,
      fleetId: this.trucknumber,
      payment: this.payForm.value.paytype,
      cheque_number: this.checkno,
      bankId: this.payForm.value.bank,
      amount_paid: this.payForm.value.amount,
      denomination: this.denom,
      userId: localStorage.getItem('userId')
    }
    console.log(data)
    console.log(this.total,data.amount_paid , data.payment )
    if (this.total != data.amount_paid && data.payment == 'cash') {
      alert('not matched')
    }
  }
}
