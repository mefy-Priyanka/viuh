import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompanyService } from '../../service/company.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.css']
})
export class PeriodComponent implements OnInit {
  // periodFormErrors: {};
  periodForm: FormGroup;
  submitted: boolean;
  periods=[];
  openbool: boolean;
  periodFormErrors: { period_name: any; period_status: any; from: any; to: any; fiscle_year:any; assessment_year:any; quarter_end:any; quarter_start:any;};
  constructor(private formBuilder: FormBuilder, private CompanyService: CompanyService, private toastr: ToastrService) {
    this.periodFormErrors = {
      period_name: {},
      period_status: {},
      from: {},
      to: {},
      fiscle_year: {},
      assessment_year: {},
      quarter_start: {},
      quarter_end: {},
    };
  }

  ngOnInit() {
    this.periodForm = this.createAccountForm()

    this.periodForm.valueChanges.subscribe(() => {
      this.onperiodFormValuesChanged();
    });
    this.getperiodList()
  }
  getperiodList() {
    this.CompanyService.periodList(localStorage.getItem('userId')).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.periods=result.result
    },
      error => {
        console.log(error);

      })
  }
  checkopen(date){
    date=moment(date).toISOString()
    console.log(date)
    let i=0;
    for(i=0;i<this.periods.length;i++){
     
      console.log(this.periods[i].from,date,this.periods[i].to)
      if(this.periods[i].from<date && date<this.periods[i].to){
        this.openbool=true;
       alert(i);
       return;
      }
      else{
        this.openbool=false
      }
    }
    console.log(this.openbool)
  }
  createAccountForm() {
    return this.formBuilder.group({
      period_name: ['', Validators.required],
      period_status: ['', Validators.required],
      from: ['', Validators.required],
      to: ['', Validators.required],
      fiscle_year: ['', Validators.required],
      assessment_year: ['', Validators.required],
      quarter_start: ['', Validators.required],
      quarter_end: ['', Validators.required],
    });
  }

  onperiodFormValuesChanged() {
    for (const field in this.periodFormErrors) {
      if (!this.periodFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.periodFormErrors[field] = {};
      // Get the control
      const control = this.periodForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.periodFormErrors[field] = control.errors;
      }
    }
  }
  submit() {
    
    console.log(this.periodForm.value)
    this.submitted = true;
    var accounttype: any;
    if (this.periodForm.valid) {

      let data = {
        period_name: this.periodForm.value.period_name,
        period_status: this.periodForm.value.period_status,
        from: moment(this.periodForm.value.from).toISOString(),
        to: moment(this.periodForm.value.to).toISOString(),
        userId: localStorage.getItem('userId'),
        fiscle_year: this.periodForm.value.fiscle_year,
        assessment_year: this.periodForm.value.assessment_year,
        quarter_start: this.periodForm.value.quarter_start,
        quarter_end: this.periodForm.value.quarter_end,
      }
      console.log('let data be', data);
      
      this.CompanyService.creatperiod(data).subscribe(value => {
        this.submitted = false;
        this.toastr.success('Congo!', 'account Successfully Created'),
          console.log('user', value)
        let result: any = {}
        result = value
        this.periodForm.reset();
      },
        err => {
          console.log(err)
          this.submitted = false;

          this.toastr.error('Error!', 'Server Error')
        })
    }

  }

}
