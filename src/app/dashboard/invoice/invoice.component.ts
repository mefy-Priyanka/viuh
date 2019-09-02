import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';

import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';
import { SharedService } from 'src/app/service/shared.service';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  myForm: FormGroup;
  consigmentDetail = [];
  contactlist = [];
  worklist = [];
  firstaccountid: any;
  fleetaccount: any;
  ratelist: any = [];
  selectedconsignment: any;
  totalval: number;
  customername: any;
  htmlval:any=[]
  constructor(private fb: FormBuilder, private SharedService: SharedService, private userService: UserService, private toastr: ToastrService, private companyService: CompanyService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      Work_order: '',
      customer: '',
      invoice_date: '',
      terms: '',
      due_date: '',
      sub_total: '',
      adjustment: 0,
      periodstart: '',
      periodend: '',
      reverse_change: '',
      igstamount: 0,
      igstrate: 0,
      cgstamount: 0,
      cgstrate: 0,
      sgstamount: 0,
      sgstrate: 0,
      amount: '',
      arraydata: this.fb.array([])
    })

    this.myForm.valueChanges.subscribe(() => {
      this.onmyFormValuesChanged();
    });
    this.addPhone();
    this.getConsignmentList();
    this.customerList();
    this.customerList();
    this.getwork();
    this.get();
    this.getrate()
  }


  change(j) {
    console.log(this.phoneForms)

    // this.phoneForms.controls[0].controls.amount.value=7
    this.totalval = 0;
    var temp: any = [];
    console.log(this.selectedconsignment);
    // var result = jQuery('.switch-input').is(':checked') ? true : false;
    for (var i = 0; i < this.ratelist.length; i++) {
      console.log('-------------------------------------------'+this.ratelist[i].truck_confg , this.selectedconsignment.truck_confg)
      if (this.ratelist[i].truck_confg == this.selectedconsignment.truck_confg) {
        console.log('config true')
        if (this.selectedconsignment.within_state == this.ratelist[i].within_state) {
          console.log('state true')

          if (this.ratelist[i].price_type == this.selectedconsignment.price_type) {
            console.log('price  true')

            if (((new Date(this.ratelist[i].effactive_date_from).getTime()) <= (new Date(this.selectedconsignment.consignment_date).getTime()) && (new Date(this.ratelist[i].effactive_date_to).getTime()) >= (new Date(this.selectedconsignment.consignment_date).getTime()))) {
              console.log('config and price type and date and state matched')
              temp.push(this.ratelist[i]);
              console.log(temp)
            }
          }
        }
      }
    }

    if (this.selectedconsignment.truck_confg == 12 || this.selectedconsignment.truck_confg == 19 || this.selectedconsignment.truck_confg == 20 || this.selectedconsignment.truck_confg == 24) {
      console.log(temp[temp.length - 1])
      if (temp[temp.length - 1]) {
        if (temp[temp.length - 1].price_type == 'fdz') {
          console.log(parseFloat(this.selectedconsignment.truck_confg), parseFloat(temp[temp.length - 1].rate), parseFloat(temp[temp.length - 1].to_km))
          this.totalval = parseFloat(this.selectedconsignment.truck_confg) * parseFloat(temp[temp.length - 1].rate);
        }
        else if (temp[temp.length - 1].price_type == 'bfdz') {
          console.log(parseFloat(this.selectedconsignment.truck_confg), parseFloat(temp[temp.length - 1].rate), parseFloat(this.selectedconsignment.distance))
          this.totalval = parseFloat(this.selectedconsignment.truck_confg) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.selectedconsignment.distance);
        }
      }



    }
    else if (this.selectedconsignment.truck_confg == 306 || this.selectedconsignment.truck_confg == 450) {
      if (temp[temp.length - 1]) {
        if (temp[temp.length - 1].price_type == 'fdz') {
          this.totalval = parseFloat(this.selectedconsignment.truck_confg) * parseFloat(temp[temp.length - 1].rate);
        }
        else if (temp[temp.length - 1].price_type == 'bfdz') {
          this.totalval = parseFloat(this.selectedconsignment.truck_confg) * parseFloat(temp[temp.length - 1].rate) * parseFloat(this.selectedconsignment.distance) * 2;
        }
      }

    }
    if (this.customername.match('emami')) {
      var net = 0;
      for (var i = 0; i < this.selectedconsignment.consignment.length; i++) {
        
        net = net + parseInt(this.selectedconsignment.consignment[i].net_wt)
      }
      console.log( net)
      if(this.selectedconsignment.freight){
        this.totalval = parseFloat(this.selectedconsignment.freight) * net;
      }
      else{
        alert('there is no fright list ');
        return;
      }
    }
    // alert(this.totalval)
    this.selectedconsignment.amount = this.totalval

    console.log(this.totalval)
    if (this.totalval == 0) {
      let xx = confirm('there is no rate defined')
      if (xx) {

      }
    }
    else {
      alert(this.selectedconsignment.amount)

    }
    this.htmlval[j]=(this.selectedconsignment.amount)


  }
  changeconsigner(id,j) {
    for (var i = 0; i < this.consigmentDetail.length; i++) {
      if (this.consigmentDetail[i]._id == id) {
        this.selectedconsignment = this.consigmentDetail[i];
        this.change(j)
        return;
      }
    }
  }
  getConsignmentList() {
    this.userService.consignmentList(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.consigmentDetail = result.result
      console.log(this.consigmentDetail);
    },
      error => {
        console.log(error);

      })
  }

  getwork() {
    let some: any;

    this.companyService.getworkorder(localStorage.getItem('SuperAdmin')).subscribe(result => {
      some = result
      console.log(some.result);
      this.worklist = some.result
    },
      err => {
        console.log(err);
        this.toastr.error('oops', 'work order creation failed')

      })
  }


  customerList() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'customer'
    }
    this.companyService.getcustomer(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.contactlist = result.result
      console.log(this.contactlist);
    },
      error => {
        console.log(error);

      })
  }

  onmyFormValuesChanged() {
    let i = 0;
    var amounts = 0;
    console.log(this.myForm.value.arraydata)
    if (this.myForm.value.arraydata.length != 0) {

      for (i = 0; i < this.myForm.value.arraydata.length; i++) {
        
        amounts = (amounts) + parseInt(this.myForm.value.arraydata[i].amount)
      }
    }

    this.myForm.value.sub_total = amounts;
    this.calc();
  }
  get phoneForms() {
    return this.myForm.get('arraydata') as FormArray
  }


  calc() {
    console.log(this.myForm.value.sub_total.toString())
    console.log(this.myForm.value.adjustment)

    var adjustedval = eval(this.myForm.value.sub_total + parseInt(this.myForm.value.adjustment))
    console.log(adjustedval)
    this.myForm.value.igstamount = (this.myForm.value.igstrate * adjustedval) / 100;
    this.myForm.value.cgstamount = (this.myForm.value.cgstrate * adjustedval) / 100;

    this.myForm.value.sgstamount = (this.myForm.value.sgstrate * adjustedval) / 100;


    this.myForm.value.amount = this.myForm.value.igstamount + adjustedval + this.myForm.value.sgstamount + this.myForm.value.cgstamount;

  }
  addPhone() {

    const phone = this.fb.group({
      serial_number: [this.phoneForms.value.length + 1],
      cosignmentId: [],
      description: [],
      amount: [0]
    })
    this.phoneForms.push(phone);

  }
  getrate() {
    this.userService.getrate(localStorage.getItem('SuperAdmin')).subscribe(data => {
      let result: any = {}
      result = data;
      this.ratelist = result.result

    },
      error => {
        console.log(error);

      })
  }
  deletePhone(i) {
    this.phoneForms.removeAt(i)
  }
  submit() {
    console.log(this.myForm.value);
    let data = {
      customerId: this.myForm.value.customer,
      Work_order: this.myForm.value.Work_order,
      invoice_date: this.myForm.value.invoice_date,
      terms: this.myForm.value.terms,
      due_date: this.myForm.value.due_date,
      sub_total: this.myForm.value.sub_total,
      total: this.myForm.value.amount,
      adjustment: {
        amount: this.myForm.value.adjustment,
      },
      period: {
        start_date: this.myForm.value.periodstart,
        end_date: this.myForm.value.periodend,
      },
      reverse_change: this.myForm.value.reverse_change,
      igst: {
        rate: this.myForm.value.igstrate,
        amount: this.myForm.value.igstamount,
      },
      cgst: {
        rate: this.myForm.value.cgstrate,
        amount: this.myForm.value.cgstamount,
      },

      sgst: {
        rate: this.myForm.value.sgstrate,
        amount: this.myForm.value.sgstamount,
      },

      items_details: this.myForm.value.arraydata,
      userId: localStorage.getItem('userId'),
    }
    console.log(data);
    this.userService.creatinvoice(data).subscribe(result => {
      console.log(data);
      this.toastr.success('Awesome!', 'invoice saved suceesfully');
      this.createjournal()
    },
      err => {
        console.log(err);
        this.toastr.error('Error in invoice!', 'Server Error')

      })
  }
  onChangeObj(data) {
    var account: any;
    for (var i = 0; i < this.contactlist.length; i++) {
      if (this.contactlist[i]._id == data) {
        // parent=this.contactlist[i].contact_type;
        account = this.contactlist[i].name;
        this.customername = this.contactlist[i].name;
        break;
      }
    }

    let datas = {
      accounttype: "Asset",
      account: account,
      parent: "Account Receivables",
      super_parent_Account: "Current Assets",
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    console.log(datas)
    this.userService.accountbytype(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      this.firstaccountid = something.result[0]._id
      console.log(this.firstaccountid)
    },
      err => {
        console.log(err)

      })
  }

  get() {

    let datas = {
      accounttype: "Revenue",
      account: "Fleets",

      superAdminId: localStorage.getItem('SuperAdmin')
    }

    this.userService.accountbyname(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      if (something.result.length != 0) {
        this.fleetaccount = something.result[0]._id
      }
      console.log('fleet account', this.fleetaccount)
    },
      err => {
        console.log(err)

      })
  }


  createjournal() {

    let data = {
      date: new Date().toISOString(),
      reference: this.myForm.value.customer,
      notes: '',
      total: this.myForm.value.amount,
      userId: localStorage.getItem('userId'),
      journal_base: 'bank',
      detail: [{
        accountId: this.firstaccountid,
        debit: this.myForm.value.amount,
        description: 'description'
      },
      {
        accountId: this.fleetaccount,
        credit: this.myForm.value.amount,
        description: 'description'
      }
      ]
    }
    console.log(data);

    this.userService.journalcreat(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'Journal created suceesfully');
      console.log(result);
      this.SharedService.abc('invoicelist');

    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }


}
