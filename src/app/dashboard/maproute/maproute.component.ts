import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-maproute',
  templateUrl: './maproute.component.html',
  styleUrls: ['./maproute.component.css']
})
export class MaprouteComponent implements OnInit {
  [x: string]: any;

  from_location = '';
  to_location = '';
  total_km = '';
  diesel_expenses = '';
  driver_expenses = '';
  stopages: any = [];
  stopage = []
  others_expenses = [];
  loader=false;
  public superAdminId ='';

  constructor(private companyService:CompanyService,private toastr: ToastrService ) { 
    this.superAdminId= localStorage.getItem('SuperAdmin');
    console.log(this.superAdminId)
  }

  ngOnInit() {
    this.addother();
    this.addstopage();
    this.getroute()
  }
  addstopage() {
    let temp: any
    this.stopages.push(temp);
  }
  addother() {
    let temp = {
      name: '',
      expenses: ''
    }
    this.others_expenses.push(temp);
  }
  submit() {
    this.loader = true;

    let data = {
      from_location: this.from_location,
      to_location: this.to_location,
      total_km: this.total_km,
      diesel_expenses: this.diesel_expenses,
      driver_expenses: this.driver_expenses,
      stopage: this.stopage,
      others_expenses: this.others_expenses,
      userId: localStorage.getItem('userId')
    }
    console.log(data)
    this.companyService.creatroute(data).subscribe(response => {
      this.loader = false;
      this.toastr.success('Great !', 'Route Successfully created'),
        console.log(response);
      let result: any = {};
      result = response;

    }, err => {
      console.log(err);
      // this.reset(type);
      this.loader = false;
      this.toastr.error('oops !', 'Route creation failed');
    });

  }

  getroute(){
    this.companyService.getroute(this.superAdminId).subscribe(response => {
      this.toastr.success('Great !', 'Route got Successfully '),
        console.log(response);
      let result: any = {};
      result = response;

    }, err => {
      console.log(err);
      // this.reset(type);
     
      this.toastr.error('oops !', 'Route get failed');
    });
  }
}
