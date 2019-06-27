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
  periodFormErrors: { period_name: any; period_status: any; from: any; to: any; };
  constructor(private formBuilder: FormBuilder, private CompanyService: CompanyService, private toastr: ToastrService) {
    this.periodFormErrors = {
      period_name: {},
      period_status: {},
      from: {},
      to: {},
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
  checkopen(){
    let i=0;
    for(i=0;i<this.periods.length;i++){
      if(this.periods[i].period_status=='open'){
        this.openbool=true;
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
    this.checkopen();
    if(this.openbool){
      alert('you already have one period open please close it')
      return;
    }
    console.log(this.periodForm.value)
    this.submitted = true;
    var accounttype: any;
    if (this.periodForm.valid) {

      let data = {
        period_name: this.periodForm.value.period_name,
        period_status: this.periodForm.value.period_status,
        from: moment(this.periodForm.value.from).toISOString(),
        to: moment(this.periodForm.value.to).toISOString(),
        userId: localStorage.getItem('userId')
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
