import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

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
  constructor(private fb: FormBuilder, private toastr: ToastrService,private companyService:CompanyService) { }

  ngOnInit() {
    this.billForm = this.fb.group({
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
      gstamount: 0,
      gstrate: 0,
      amount: '',
      arraydata: this.fb.array([])
    })

    // this.billForm.valueChanges.subscribe(() => {
    //   this.onmyFormValuesChanged();
    // });
    this.addPhone();
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
}
