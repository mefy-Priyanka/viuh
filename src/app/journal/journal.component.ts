import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { UserService } from '../service/user.service';
import { SharedService } from '../service/shared.service'

import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {
  denomForm: FormGroup;
  denomFormErrors = {};
  total: number;
  accountlist1 = [];
  userId: string;
  date = '';
  reference = '';
  currency = '';
  notes = '';
  jdata = [];
  maindata = { userId: '', denomination: [] };
  ctotal = 0;
  dtotal = 0;
  cashcheck = false
  constructor(private formBuilder: FormBuilder, private userService: UserService, 
    private SharedService :SharedService,private toastr: ToastrService) {
    this.userId = localStorage.getItem('userId');

    this.denomFormErrors = {
      note10: {},
      note20: {},
      note50: {},
      note100: {},
      note200: {},
      note500: {},
      note2000: {},
    };
    this.getaccountlist();

    this.addItem()
  }



  addItem() {
    let temp = {
      account: '',
      description: '',
      contact: '',
      credit: 0,
      dabit: 0
    }
    this.jdata.push(temp)
    console.log(this.jdata)
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

  ngOnInit() {
    this.denomForm = this.createAccountForm()
    this.denomForm.valueChanges.subscribe(() => {
      this.onaccountFormValuesChanged();
    });
    this.userId = localStorage.getItem('userId');
    this.maindata.userId = this.userId;

  }

  getaccountlist() {
    let something: any;
    this.userService.getaccountlist1(this.userId).subscribe(result => {
      something = result
      this.accountlist1 = (something.result);
      console.log(this.accountlist1);
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


  removeitem() {
    if (this.denomForm.value.note10 != 0) {
      let some = {
        type: 10,
        count: this.denomForm.value.note10,
        amount: this.denomForm.value.note10 * 10,
      }
      this.maindata.denomination.push(some)
    }
    if (this.denomForm.value.note20 != 0) {
      let some = {
        type: 20,
        count: this.denomForm.value.note20,
        amount: this.denomForm.value.note20 * 20,
      }
      this.maindata.denomination.push(some)
    }
    if (this.denomForm.value.note50 != 0) {
      let some = {
        type: 50,
        count: this.denomForm.value.note50,
        amount: this.denomForm.value.note50 * 50,
      }
      this.maindata.denomination.push(some)
    }
    if (this.denomForm.value.note100 != 0) {
      let some = {
        type: 100,
        count: this.denomForm.value.note100,
        amount: this.denomForm.value.note100 * 100,
      }
      this.maindata.denomination.push(some)
    }
    if (this.denomForm.value.note200 != 0) {
      let some = {
        type: 200,
        count: this.denomForm.value.note200,
        amount: this.denomForm.value.note200 * 200,
      }
      this.maindata.denomination.push(some)
    }
    if (this.denomForm.value.note500 != 0) {
      let some = {
        type: 500,
        count: this.denomForm.value.note500,
        amount: this.denomForm.value.note500 * 500,
      }
      this.maindata.denomination.push(some)
    }
    if (this.denomForm.value.note2000 != 0) {
      let some = {
        type: 2000,
        count: this.denomForm.value.note2000,
        amount: this.denomForm.value.note2000 * 2000,
      }
      this.maindata.denomination.push(some)
    }

    console.log(this.maindata)

  }
  submit() {

    if (this.date == '') {
      alert('date is not seleted');
      return
    }
    if (this.reference == '') {
      alert('reference is not seleted');
      return
    }
    if (this.notes == '') {
      alert('notes is not seleted');
      return
    }
    Object.assign(this.maindata, { detail: this.jdata })
    Object.assign(this.maindata, { total: this.ctotal });
    Object.assign(this.maindata, { date: moment(this.date).toISOString() });
    Object.assign(this.maindata, { reference: this.reference })
    Object.assign(this.maindata, { notes: this.notes })
    console.log(this.maindata);


    console.log(this.ctotal, this.dtotal, this.total);


    if (this.cashcheck) {
      console.log('cash selected')
      if (this.ctotal == this.dtotal && this.total == this.dtotal) {
        console.log('all equal')
      }
      else {
        alert('please make sure credit is equal to dabit');
        return;
      }
    }
    else if (!this.cashcheck) {
      console.log('no cash selected')
      if (this.ctotal == this.dtotal) {
        console.log('only two equal');
        delete this.maindata['denomination'];
      }
      else {
        alert('please make sure credit is equal to dabit');
        return;
      }
    }
    console.log(this.maindata);

    this.userService.journalcreat(this.maindata).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Journal created suceesfully');
      console.log(result);
      this.SharedService.abc('journal');
     
    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }
  check(index, field) {

    console.log(index)
    if (field == 'dabit') {
      this.jdata[index].credit = 0;
    }
    if (field == 'credit') {
      this.jdata[index].dabit = 0;
    }
    let i = 0;
    this.ctotal = 0;
    this.dtotal = 0;
    for (i = 0; i < this.jdata.length; i++) {
      this.ctotal = this.ctotal + this.jdata[i].credit;
      this.dtotal = this.dtotal + this.jdata[i].dabit;
    }
    console.log('credit: ' + this.ctotal);
    console.log('dabit: ' + this.dtotal)

  }

  checkValue(value) {
    console.log(value.currentTarget.checked);
    this.cashcheck = value.currentTarget.checked
    if (this.cashcheck) {
      document.getElementById("models").click();
    }
  }

  submitmodel() {
    this.maindata.denomination = []
    this.removeitem();
    if (this.maindata.denomination.length == 0) {
      alert('nothing selected');
      return;
    }
    else {
      this.maindata.denomination = []
      this.removeitem();

      document.getElementById("cancel").click();
    }
    this.cashcheck = true;

  }

  cancelmodel() {
    this.cashcheck = false;
  }




  draft() {

    if (this.date == '') {
      alert('date is not seleted');
      return
    }
    if (this.reference == '') {
      alert('reference is not seleted');
      return
    }
    if (this.notes == '') {
      alert('notes is not seleted');
      return
    }
    Object.assign(this.maindata, { detail: this.jdata })
    Object.assign(this.maindata, { total: this.ctotal });
    Object.assign(this.maindata, { date: moment(this.date).toISOString() });
    Object.assign(this.maindata, { reference: this.reference })
    Object.assign(this.maindata, { notes: this.notes })
    console.log(this.maindata);


    console.log(this.ctotal, this.dtotal, this.total);


    if (this.cashcheck) {
      console.log('cash selected')
      if (this.ctotal == this.dtotal && this.total == this.dtotal) {
        console.log('all equal')
      }
      else {
        alert('please make sure credit is equal to dabit')
      }
    }
    else if (!this.cashcheck) {
      console.log('no cash selected')
      if (this.ctotal == this.dtotal) {
        console.log('only two equal');
        delete this.maindata['denomination'];
      }
      else {
        alert('please make sure credit is equal to dabit')
      }
    }
    console.log(this.maindata);

    this.userService.journaldraft(this.maindata).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Journal saved suceesfully');
      this.SharedService.abc('journal');

    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })



  }


}
