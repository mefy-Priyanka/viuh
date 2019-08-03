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
  contact: any;
  contractor: string;
  own: string;
  creditaccount: any;
  dabtaccount: any;
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
      // for (var i = 0; i < this.fleetDetail.length; i++) {
      //   console.log(i)
      //   if (this.fleetDetail[i].contractId == null) {
      //     this.fleetDetail.splice(i, 1);
      //     i = i - 1;
      //   }
      //   console.log(this.fleetDetail);

      // }
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
      if (this.fleetDetail[i]._id == value) {
        // console.log(i, this.fleetDetail[i].contractId._id, value)
        this.payForm.value.truck = this.fleetDetail[i]._id;
        this.trucknumber = this.fleetDetail[i].truck_number;

        let data = {
          fleetid: this.fleetDetail[i]._id,
          truckno: this.fleetDetail[i].truck_number
        }
        this.truckarray.push(data);

      }
      else {
        this.payForm.value.truck = null;
        this.trucknumber = ''
      }
    }
    console.log(this.truckarray)
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
  filter() {
    for (var i = 0; i < this.contactlist.length; i++) {
      if (this.payForm.value.to == this.contactlist[i]._id) {
        this.contact = this.contactlist[i]._id;
        this.contractor = "";
        this.own = ""
        return;
      }
    }

    for (var i = 0; i < this.fleetDetail.length; i++) {
      if (this.payForm.value.to == this.fleetDetail[i]._id) {

        if (this.fleetDetail[i].contractId == null) {
          this.contact = ''
          this.contractor = "";
          this.own = this.fleetDetail[i].ownId._id;
          return;
        }
        else if (this.fleetDetail[i].ownId == null) {
          this.contact = ''
          this.contractor = this.fleetDetail[i].contractId._id;
          this.own = ''
          return;
        }

      }
    }

  }
  submit() {
    // this.changemode(this.payForm.value.paymode)
    this.filter()
    if (this.paymode == 'cash') {
      this.payForm.value.bankId = ''
    }
    let data = {
      contactId: this.contact,
      contractId: this.contractor,
      ownerId: this.own,
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

    // this.getdabitaccount()
    // console.log(this.total, data.amount_paid, data.payment)
    if (this.total != data.amount_paid && data.payment_mode == 'cash') {
      alert('not matched');
      return;
    }
    this.userService.creatvoucher(data).subscribe(result => {
      console.log(result);
      this.toastr.success('congrets', 'payment created successfullt');
      this.getcreditaccount();
      this.SharedService.abc('payvoucherlist');
    },
      err => {
        console.log(err)
      })
  }
  getdabitaccount() {
    var parent = 'Current Assets'
    var account = '';
    var accounttype = 'Asset'

    for (var i = 0; i < this.contactlist.length; i++) {
      if (this.payForm.value.to == this.contactlist[i]._id) {
        if (this.contactlist[i].contact_type == 'customer') {
          parent = 'Account Receivables';
          account = this.contactlist[i].name
          break;
        }
        if (this.contactlist[i].contact_type == 'driver') {
          parent = '';
          account = this.contactlist[i].name;
          accounttype = 'Expense'
          break;
        }
        if (this.contactlist[i].contact_type == 'employee') {
          parent = '';
          account = this.contactlist[i].name;
          accounttype = 'Expense'
          break;
        }
        if (this.contactlist[i].contact_type == 'vendor') {
          parent = '';
          account = this.contactlist[i].name;
          accounttype = 'Expense'
          break;
        }

      }
    }

    for (var i = 0; i < this.fleetDetail.length; i++) {
      if (this.payForm.value.to == this.fleetDetail[i]._id) {

        parent = 'Fleets';
        account = this.fleetDetail[i].truck_number;
        accounttype = 'Expense'
        break

      }
    }




    if (accounttype == 'Expense') {
      let datas = {
        accounttype: accounttype,
        account: account,
        // parent: parent,
        superAdminId: localStorage.getItem('SuperAdmin')
      }

      this.userService.accountbyname(datas).subscribe(result => {
        console.log(result);
        let something: any;
        something = result
        if (something.result.length != 0) {
          this.dabtaccount = something.result[0]._id
        }
        console.log(this.dabtaccount);
        this.creatjournal()
      },
        err => {
          console.log(err)

        })
    }
    else {
      
      let datas = {
        accounttype: accounttype,
        account: account,
        parent: parent,
        superAdminId: localStorage.getItem('SuperAdmin')
      }
      this.userService.accountbytype(datas).subscribe(result => {
        console.log(result);
        let something: any;
        something = result
        if (something.result.length != 0) {
          this.dabtaccount = something.result[0]._id
        }
        console.log(this.dabtaccount);
        this.creatjournal()
      },
        err => {
          console.log(err)

        })
    }


  }


  getcreditaccount() {
    var parent = 'Current Assets'
    var account = '';
    var accounttype = 'Asset'
    console.log(this.paymode)
    if (this.paymode == 'cash') {
      account = 'Cash'
    }
    else {
      account = 'Bank'
    }


    let datas = {
      accounttype: accounttype,
      account: account,
      parent: parent,
      superAdminId: localStorage.getItem('SuperAdmin')

    }
    console.log(datas)
    this.userService.accountbytype(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      if (something.result.length != 0) {
        this.creditaccount = something.result[0]._id
      }
      console.log(this.creditaccount)
      this.getdabitaccount()

    },
      err => {
        console.log(err)

      })

  }


  creatjournal() {

    let data = {
      date: new Date().toISOString(),
      reference: '',
      notes: '',
      total: this.payForm.value.amount,
      userId: localStorage.getItem('userId'),
      detail: [{
        accountId: this.creditaccount,
        credit: this.payForm.value.amount,
        description: 'description'
      },
      {
        accountId: this.dabtaccount,
        debit: this.payForm.value.amount,
        description: 'description'
      }
      ]
    }
    console.log(data);
    // return;
    this.userService.journalcreat(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Journal created suceesfully');
      console.log(result);


    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }


}
