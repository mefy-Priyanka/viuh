import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../service/shared.service';
import { UserService } from 'src/app/service/user.service';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from '../../service/company.service';
import { FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-rate',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent implements OnInit {
  contactlist: any = [];
  customer: '';
  basekm: '';
  baserate: '';
  unit: '';
  addkm: '';
  addrate: '';
  startdate: '';
  enddate: '';
  loader = false;
  ratelist: any=[];
  constructor(private formBuilder: FormBuilder, private SharedService: SharedService, private userService: UserService, private CompanyService: CompanyService, private toastr: ToastrService) { }

  ngOnInit() {
    this.customerList();
    this.getratelist();
  }
  getratelist(){
    this.userService.getrate(localStorage.getItem('SuperAdmin')).subscribe(data => {
      console.log(data);
      let something:any=data;
      this.ratelist=something.result
    },
    err=>{
      console.log(err)
    })
  }
  customerList() {
    let data = {
      id: localStorage.getItem('SuperAdmin'),
      contact_type: 'customer'
    }
    this.CompanyService.getcustomer(data).subscribe(data => {

      let result: any = {}
      result = data;
      this.contactlist = result.result
      console.log(this.contactlist);
    },
      error => {
        console.log(error);

      })
  }
  submit() {
    // this.loader = true;
    let data = {
      customerId: this.customer,
      base_km: this.basekm,
      base_rate: this.baserate,
      unit: this.unit,
      add_km: this.addkm,
      add_km_rate: this.addrate,
      effactive_date_from:new Date(this.startdate).toISOString() ,
      effactive_date_to: new Date(this.enddate).toISOString() ,
      userId: localStorage.getItem('SuperAdmin')
    }
    console.log(data);
    this.reset()
    console.log(data);
    
    this.userService.saverate(data).subscribe(result => {
      console.log(data);
      this.loader = false;
      this.toastr.success('congrets', 'Rate Updates Successfully');
      this.reset();
      this.getratelist();
    }, err => {
      console.log(err);
      this.loader = false;
      this.toastr.error('oops', 'Some error Occured')

    })
  }
  reset(){
    this.customer= '';
    this.basekm= '';
    this.baserate= '';
    this.unit= '';
    this.addkm= '';
    this.addrate= '';
    this.startdate= '';
    this.enddate= '';
  }
}
