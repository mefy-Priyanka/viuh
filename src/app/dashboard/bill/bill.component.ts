import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.css']
})
export class BillComponent implements OnInit {
public  bill:boolean=true;
billForm: FormGroup;
vendorlist=[];
consigmentDetail=[];
  constructor(private fb: FormBuilder, private userService: UserService, private toastr: ToastrService,private companyService:CompanyService) { }

  ngOnInit() {
    this.billForm = this.fb.group({
      work_order: '',
      vendorId: '',
      bill_date: '',
      terms: '',
      due_date: '',
      sub_total: '',
      adjustment: 0,
      periodstart: '',
      periodend: '',
      reverse_change: '',
      tdsamount: 0,
      tdsrate: 0,
      amount: '',
      notes: '',
      arraydata: this.fb.array([])
    })

    this.billForm.valueChanges.subscribe(() => {
      this.onbillFormValuesChanged();
    });

    this.addPhone();
    this.getConsignmentList();
    this.vendorList();
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
    this.calc();
  }
  calc() {
    console.log(this.billForm.value.sub_total.toString())
    console.log(this.billForm.value.adjustment)

    var adjustedval = eval(this.billForm.value.sub_total + parseInt(this.billForm.value.adjustment))
    console.log(adjustedval)
    this.billForm.value.tdsamount = (this.billForm.value.tdsrate * adjustedval) / 100;

    this.billForm.value.amount = this.billForm.value.tdsamount + adjustedval;


  }
  createbill(){
    this.bill=!this.bill;
  }
  get phoneForms() {
    return this.billForm.get('arraydata') as FormArray
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
    let data={
      id:localStorage.getItem('SuperAdmin'),
      contact_type:'vendor'
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
  submit() {
    console.log(this.billForm.value);
    let data = {
      vendorId: this.billForm.value.vendorId,
      work_order: this.billForm.value.work_order,
      bill_date: this.billForm.value.bill_date,
      terms: this.billForm.value.terms,
      notes:this.billForm.value.notes,
      due_date: this.billForm.value.due_date,
      sub_total: this.billForm.value.sub_total,
      total: this.billForm.value.amount,
      adjustment: {
        amount: this.billForm.value.adjustment,
      },
      period: {
        start_date: this.billForm.value.periodstart,
        end_date: this.billForm.value.periodend,
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
    this.userService.createbill(data).subscribe(result=>{
      console.log(data);
      this.toastr.success('Awesome!', 'Bill saved suceesfully');
    },
    err=>{
      console.log(err);
      this.toastr.error('Error!', 'Server Error')

    })
  }
}
