import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';
import * as moment from 'moment'
import { SharedService } from 'src/app/service/shared.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
  public bill: boolean = true;
  billForm: FormGroup;
  vendorlist = [];
  consigmentDetail = [];
  worklist: any;
  contractorDetail: any;
  firstaccountid: any;
  venderid: any;
  contractorid: any;
  constructor(private fb: FormBuilder, private SharedService: SharedService, private userService: UserService, private toastr: ToastrService, private companyService: CompanyService) { }

  ngOnInit() {
    this.getwork()
    this.billForm = this.fb.group({
      work_order: '',
      vendorId: '',
      bill_date: '',
      terms: '',
      due_date: '',
      sub_total: '',
      adjustment: 0,
      discount: 0,
      periodstart: '',
      periodend: '',
      reverse_change: '',
      tdsamount: 0,
      tdsrate: 0,
      amount: '',
      notes: '',
      status: '',
      amount_paid: 0,
      arraydata: this.fb.array([])
    })

    this.billForm.valueChanges.subscribe(() => {
      this.onbillFormValuesChanged();
    });

    this.addPhone();
    this.getConsignmentList();
    this.vendorList();
    this.getContractorList()
  }
  onbillFormValuesChanged() {
    let i = 0;
    var amounts = 0;
    console.log(this.billForm.value.arraydata)
    if (this.billForm.value.arraydata.length != 0) {
      for (i = 0; i < this.billForm.value.arraydata.length; i++) {
        amounts = (amounts) + parseInt(this.billForm.value.arraydata[i].amount)
      }
    }

    this.billForm.value.sub_total = amounts;
    console.log("hi", this.billForm.value.sub_total)
    this.calc();
  }
  getContractorList() {
    this.companyService.contractorList(localStorage.getItem('userId')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.contractorDetail = result.result
      console.log(this.contractorDetail);

    },
      error => {
        console.log(error);

      })
  }
  calc() {
    console.log(this.billForm.value.sub_total.toString())
    console.log(this.billForm.value.adjustment)

    var adjustedval = eval(this.billForm.value.sub_total + parseInt(this.billForm.value.adjustment))
    console.log(adjustedval)
    this.billForm.value.tdsamount = (this.billForm.value.tdsrate * adjustedval) / 100;

    this.billForm.value.amount = this.billForm.value.tdsamount + adjustedval;


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
  createbill() {
    this.bill = !this.bill;
  }
  get phoneForms() {
    return this.billForm.get('arraydata') as FormArray
  }


  onChangeObj(data) {
    console.log(data);
    var accounttype = 'Expense'
    var account = '';
    var parent = 'Contractors';
    var alldata = this.vendorlist.concat(this.contractorDetail);

    console.log(alldata)
    for (var i = 0; i < alldata.length; i++) {
      if (alldata[i]._id == data) {
        console.log('daaaaaaaaaaaaaaa')
        if (alldata[i].contact_type) {
          account = alldata[i].name;
          parent = 'Vendor';
        }
        else {
          account = alldata[i].companyName;
        }
        break;
      }
    }


    let datas = {
      accounttype: accounttype,
      account: account,
      parent: parent
    }
    console.log(datas);
    this.userService.accountbytype(datas).subscribe(result => {
      console.log(result);
      let something: any;
      something = result
      if (something.result.lenght != 0) {
        this.firstaccountid = something.result[0]._id

      }
      console.log(this.firstaccountid)
    },
      err => {
        console.log(err)

      })
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
  vendorList() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'vendor'
    }
    this.companyService.getvendor(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.vendorlist = result.result
      console.log(this.vendorlist);
    },
      error => {
        console.log(error);

      })
  }
  deletePhone(i) {
    this.phoneForms.removeAt(i)
  }
  check() {

    for (var i = 0; i < this.vendorlist.length; i++) {
      if(this.vendorlist[i]._id==this.billForm.value.vendorId){
        console.log('vender');
        this.venderid=this.vendorlist[i]._id;
        this.contractorid=''
      }
      else{
        console.log('contractor');
        this.contractorid=this.vendorlist[i]._id;
        this.venderid=''
      }
    }
  }
  submit() {
    this.check()
    console.log(this.billForm.value);
   
    let data = {
      vendorId: this.venderid,
      contractId:this.contractorid,
      work_order: this.billForm.value.work_order,
      bill_date: moment(this.billForm.value.bill_date).toISOString(),
      terms: this.billForm.value.terms,
      notes: this.billForm.value.notes,
      due_date: moment(this.billForm.value.due_date).toISOString(),
      sub_total: this.billForm.value.sub_total,
      total: this.billForm.value.amount,
      amount_paid: this.billForm.value.amount_paid,
      status: this.billForm.value.status,
      discount: this.billForm.value.discount,
      adjustment: {
        amount: this.billForm.value.adjustment,
      },
      period: {
        start_date: moment(this.billForm.value.periodstart).toISOString(),
        end_date: moment(this.billForm.value.periodend).toISOString(),
      },
      reverse_change: this.billForm.value.reverse_change,

      tds: {
        rate: this.billForm.value.tdsrate,
        amount: this.billForm.value.tdsamount,
      },
      items_details: this.billForm.value.arraydata,
      userId: localStorage.getItem('userId'),
    }
    console.log(data);
    
    this.userService.createbill(data).subscribe(result => {
      console.log(data);
      this.toastr.success('Awesome!', 'Bill saved suceesfully');
      this.createjournal();
    },
      err => {
        console.log(err);
        this.toastr.error('Error!', 'Server Error')

      })
  }



  createjournal() {

    let data = {
      date: new Date().toISOString(),
      reference: this.billForm.value.vendorId,
      notes: '',
      total: this.billForm.value.amount,
      userId: localStorage.getItem('userId'),
      detail: [{
        accountId: this.firstaccountid,
        debit: this.billForm.value.amount,
        description: 'description'
      },
      {
        accountId: "5d2590fc7c8f70150cbca388",
        credit: this.billForm.value.amount,
        description: 'description'
      }
      ]
    }
    console.log(data);

    this.userService.journalcreat(data).subscribe(result => {
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
}
