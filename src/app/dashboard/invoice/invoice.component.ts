import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      work_order: '',
      customer:'',
      invoice_date: '',
      terms: '',
      due_date: '', 
      sub_total: '',
      total: '',
      adjustment: '',
      periodstart: '', 
      periodend: '',
      reverse_change: '', 
      gst: '',
      rate: '',
      amount:'',
      arraydata: this.fb.array([])
    })
  }
  get phoneForms() {
    return this.myForm.get('arraydata') as FormArray
  }

  addPhone() {
    
    const phone = this.fb.group({
      vehicle_number: [],
      invoice_number: [],
      serial_number: [this.phoneForms.value.length+1],

      item: [],
      date: [],
      ship_to_party: [],

      material: [],
      quantity: [],
      shortage: [],

      rtd_p: [],
      rtd_h: [],
      rtd_hh: [],

      rate_p: [],
      rate_h: [],
      rate_hh: [],

      gross_amount: [],
      penalty_amount: [],
      igst: [],
      cgst: [],
      s_ugst: [],

    })
    this.phoneForms.push(phone);

  }

  deletePhone(i) {
    this.phoneForms.removeAt(i)
  }
  submit() {
    console.log(this.myForm.value)
  }
}
