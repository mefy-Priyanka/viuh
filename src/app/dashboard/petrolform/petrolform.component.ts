import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';

@Component({
  selector: 'app-petrolform',
  templateUrl: './petrolform.component.html',
  styleUrls: ['./petrolform.component.css']
})
export class PetrolformComponent implements OnInit {
  petrolFormErrors: {};
  petrolForm: FormGroup;
  submitted: boolean;
  petrols = [];
  openbool: boolean;
  constructor(private formBuilder: FormBuilder, private CompanyService: CompanyService, private toastr: ToastrService) {
    this.petrolFormErrors = {
      pumpname: {},
      truckno: {},
      date: {},
      diesel: {},
      other:{},
      driver:{}
    };
  }

  ngOnInit() {
    this.petrolForm = this.createAccountForm()

    this.petrolForm.valueChanges.subscribe(() => {
      this.onpetrolFormValuesChanged();
    });
  }

 
  createAccountForm() {
    return this.formBuilder.group({
      pumpname: ['', Validators.required],
      truckno: ['', Validators.required],
      driver: ['', Validators.required],
      date: ['', Validators.required],
      diesel: ['', Validators.required],
      other:[''],
    });
  }

  onpetrolFormValuesChanged() {
    for (const field in this.petrolFormErrors) {
      if (!this.petrolFormErrors.hasOwnProperty(field)) {
        continue;
      }
      // Clear previous errors
      this.petrolFormErrors[field] = {};
      // Get the control
      const control = this.petrolForm.get(field);

      if (control && control.dirty && !control.valid) {
        this.petrolFormErrors[field] = control.errors;
      }
    }
  }
  submit() {
   
    this.submitted = true;
    
    if (this.petrolForm.valid) {

      let data = {
        pumpname: this.petrolForm.value.pumpname,
        truckno: this.petrolForm.value.truckno,
        driver:this.petrolForm.value.driver,
        date: this.petrolForm.value.date,
        diesel: this.petrolForm.value.diesel,
        other: this.petrolForm.value.other,
        userId: localStorage.getItem('userId')
      }
      console.log('let data be', data);
      this.CompanyService.creatpetrom(data).subscribe(value => {
        this.submitted = false;
        this.toastr.success('Congo!', 'account Successfully Created'),
          console.log('user', value)
        let result: any = {}
        result = value
        this.petrolForm.reset();
      },
        err => {
          console.log(err)
          this.submitted = false;

          this.toastr.error('Error!', 'Server Error')
        })
    }

  }
}

