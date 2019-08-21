import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  date: any="7";
  fleetdate: any="7";
  todaydate: any;
  consigndate:any="7";
  fromdate: string;
  fleetList: any=[];
  billList: any=[];
  consignList: any=[];
  invdate: any="7";
  invoiceList: any=[];
  constructor(private companyService:CompanyService,) {
// this.getBillList();
this.fleetDate();
this.billDate();
this.consignDate();
this.invoiceDate();
  }

  billDate() {
    console.log("hi", this.date)
    var previous = new Date(new Date().setDate(new Date().getDate() - this.date));
    console.log("Fromdate", previous.toISOString())
    this.fromdate=previous.toISOString();
    console.log("hi", this.date)
    this.getBillList();
    // this.getConsignmentList();
  }
  consignDate() {
    console.log("hi", this.consigndate)
    var previous = new Date(new Date().setDate(new Date().getDate() - this.consigndate));
    console.log("Fromdate", previous.toISOString())
    this.fromdate=previous.toISOString();
    console.log("hi", this.date)
    this.getConsignmentList();
  }
  invoiceDate() {
    console.log("hi", this.invdate)
    var previous = new Date(new Date().setDate(new Date().getDate() - this.invdate));
    console.log("Fromdate", previous.toISOString())
    this.fromdate=previous.toISOString();
    console.log("hi", this.date)
    this.getInvoiceList();
  }
  fleetDate() {
    console.log(this.fleetdate)
    var previous = new Date(new Date().setDate(new Date().getDate() + parseInt(this.fleetdate)));
    console.log(previous)
    console.log("hi", this.fleetdate)
    this.getFleetList(previous.toISOString());
  }
  getBillList(){

    let data = {
      from: this.fromdate,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    console.log(data);
    this.companyService.getdashboardbill(data).subscribe(response => {
      // this.loader = false;
      // this.toastr.success('Great !', 'Route Successfully created'),
        console.log(response);
      let result: any = {};
      result = response;
      console.log(result.result);
      this.billList=result.result;

    }, err => {
      console.log(err);
      // this.loader = false;
      // this.toastr.error('oops !', 'Route creation failed');
    });
  }
  getConsignmentList(){

    let data = {
      from: this.fromdate,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    console.log(data);
    this.companyService.getdashconsign(data).subscribe(response => {
      // this.loader = false;
      // this.toastr.success('Great !', 'Route Successfully created'),
        console.log(response);
      let result: any = {};
      result = response;
      console.log(result.result);
      this.consignList=result.result;

    }, err => {
      console.log(err);
      // this.loader = false;
      // this.toastr.error('oops !', 'Route creation failed');
    });
  }
  getInvoiceList(){
    let data = {
      from: this.fromdate,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    console.log(data);
    this.companyService.getdashinvoice(data).subscribe(response => {
      // this.loader = false;
      // this.toastr.success('Great !', 'Route Successfully created'),
        console.log(response);
      let result: any = {};
      result = response;
      console.log(result.result);
      this.invoiceList=result.result;

    }, err => {
      console.log(err);
      // this.loader = false;
      // this.toastr.error('oops !', 'Route creation failed');
    });
  }
  getFleetList(date){
    let data = {
      to: date,
      superAdminId: localStorage.getItem('SuperAdmin')
    }
    console.log(data);
    this.companyService.getdashfleet(data).subscribe(response => {
      // this.loader = false;
      // this.toastr.success('Great !', 'Route Successfully created'),
        console.log(response);
      let result: any = {};
      result = response;
      console.log(result.result);
      this.fleetList=result.result;

    }, err => {
      console.log(err);
      // this.loader = false;
      // this.toastr.error('oops !', 'Route creation failed');
    });
  }
  ngOnInit() {
  }

}
