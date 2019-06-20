import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../service/company.service';
declare const jQuery;

@Component({
  selector: 'app-tender',
  templateUrl: './tender.component.html',
  styleUrls: ['./tender.component.css']
})
export class TenderComponent implements OnInit {
  companyDetail = [];
  compcheck = [];
  names = [];
  selectedAll: any;
  selectedNames: any;
  truck = [];
  fleetDetail = [];
  fleetsdata: any[];
  driver = [];
  drivers = []
  alldata = [];
  opens:number;
  compopen: boolean=false;
  active='first';
  openss: number;
  constructor(private CompanyService: CompanyService) {

    this.names = [
      { name: 'Company Logo', key: 'companyLogo', selected: false },
      { name: 'gst', key: 'gst', selected: false },
      { name: 'Road Registration Certificate', key: 'road_registration_certificate', selected: false },
      { name: 'TradeLicense A', key: 'tradeLicense_A', selected: false },
      { name: 'TradeLicense B', key: 'tradeLicense_B', selected: false },
      { name: 'pan', key: 'pan', selected: false },
      { name: 'tan', key: 'tan', selected: false },
      { name: 'professional_tax', key: 'professional_tax', selected: false },
      { name: 'msme', key: 'msme', selected: false },
      { name: 'Registration Certificate', key: 'registration_certificate', selected: false },
      { name: 'Balance Sheet', key: 'balance_sheet', selected: false },
      { name: 'others', key: 'others', selected: false },
      { name: 'itr ', key: 'itr', selected: false },
      { name: 'Esi', key: 'esi', selected: false },
      { name: 'PF', key: 'pf', selected: false },
    ]

  }

  ngOnInit() {
    this.getfleetList();
    this.driverList();

    
  }
  driverList() {
    let data = {
      superAdminId: localStorage.getItem('SuperAdmin'),
      contact_type: 'driver'
    }
    this.CompanyService.destination(data).subscribe(data => {
      console.log(data)
      let result: any = {}
      result = data;
      this.driver = result.result
      console.log(this.driver);
      this.makedriver()
    },
      error => {
        console.log(error);
        // this.loader = false;

      })
  }



  makedriver() {
    var drivers: any = [];
    var driverss: any = [];
    for (var i = 0; i < this.driver.length; i++) {
      var data = {
        selectalldriver: false,
        name: this.driver[i].name,
        id: this.driver[i]._id
      }
      for (var key in this.driver[i]) {
        console.log(this.driver[i][key], typeof this.driver[i][key])
        if (typeof this.driver[i][key] == 'object' && this.driver[i][key] != null) {
          if (key != 'userId') {
            var some = {
              key: [key],
              selectdoc: false,
            }
            driverss.push(some);
          }
        }
      }
      var ss = {
        key: driverss,
        maindata: data
      }
      console.log(ss)
      drivers.push(ss);
      driverss = [];
      this.drivers = drivers;
    }
    console.log(driverss)
  }

  selectAlldriver(index) {
    this.drivers[index].maindata.selectalldriver = !this.drivers[index].maindata.selectalldriver;
    for (var i = 0; i < this.drivers[index].key.length; i++) {
      console.log(this.drivers[index].key[i].selectdoc)
      this.drivers[index].key[i].selectdoc = this.drivers[index].maindata.selectalldriver;
    }

  }

  checkIfdriverSelected(index) {
    console.log(index)
    var totalSelected = 0;
    console.log(this.drivers[index])
    for (var i = 0; i < this.drivers[index].key.length; i++) {
      if (this.drivers[index].key[i].selectdoc) totalSelected++;
    }
    this.drivers[index].maindata.selectalldriver = totalSelected === this.drivers[index].key.length;

    return true;
  }



  getfleetList() {
    this.CompanyService.getfleetlist(localStorage.getItem('SuperAdmin')).subscribe(data => {
      let result: any = {}
      result = data;
      this.fleetDetail = result.result;

      this.maketruck()
    },
      error => {
        console.log(error);

      })
  }

  maketruck() {
    var trucks: any = [];
    var truckss: any = [];
    for (var i = 0; i < this.fleetDetail.length; i++) {
      var data = {
        selectalltruck: false,
        number: this.fleetDetail[i].truck_number,
        id: this.fleetDetail[i]._id
      }
      for (var key in this.fleetDetail[i]) {

        if (typeof this.fleetDetail[i][key] == 'object') {
          if (key != 'userId') {
            var some = {
              key: [key],
              selectdoc: false,
            }
            truckss.push(some);
          }
        }
      }
      var ss = {
        key: truckss,
        maindata: data
      }
      console.log(ss)
      trucks.push(ss);
      truckss = [];
      this.truck = trucks;
    }
    console.log(trucks)
  }

  selectAlltruck(index) {
    this.truck[index].maindata.selectalltruck = !this.truck[index].maindata.selectalltruck;
    for (var i = 0; i < this.truck[index].key.length; i++) {
      console.log(this.truck[index].key[i].selectdoc)
      this.truck[index].key[i].selectdoc = this.truck[index].maindata.selectalltruck;
    }

  }

  checkIftrcukSelected(index) {
    console.log(index)
    var totalSelected = 0;
    console.log(this.truck[index])
    for (var i = 0; i < this.truck[index].key.length; i++) {
      if (this.truck[index].key[i].selectdoc) totalSelected++;
    }
    this.truck[index].maindata.selectalltruck = totalSelected === this.truck[index].key.length;

    return true;
  }




  selectAll() {
    this.selectedAll = !this.selectedAll;
    for (var i = 0; i < this.names.length; i++) {
      this.names[i].selected = this.selectedAll;
    }
  }
  checkIfAllSelected() {
    var totalSelected = 0;
    for (var i = 0; i < this.names.length; i++) {
      if (this.names[i].selected) totalSelected++;
    }
    this.selectedAll = totalSelected === this.names.length;

    return true;
  }

  submit() {
    var comp: any = {};
    var trucks = []
    var intruck = [];
    var indriver = [];
    var drivers = [];
    console.log(this.names.length);
    for (var i = 0; i < this.names.length; i++) {
      if (this.names[i].selected) {
        var x = (this.names[i].key)
        Object.assign(comp, { [x]: this.names[i].key })
      }

    }
    Object.assign(comp, { superAdminId: localStorage.getItem('SuperAdmin') })

    for (var i = 0; i < this.truck.length; i++) {

      for (var j = 0; j < this.truck[i].key.length; j++) {

        if (this.truck[i].key[j].selectdoc) {

          var x = (this.truck[i].key[j].key)
          Object.assign(intruck, { [x]: x[0] })
        }
      }
      trucks.push(intruck);
      intruck = [];
      trucks[i].fleetId = this.fleetDetail[i]._id;
    }



    for (var i = 0; i < this.drivers.length; i++) {

      for (var j = 0; j < this.drivers[i].key.length; j++) {

        if (this.drivers[i].key[j].selectdoc) {

          var x = (this.drivers[i].key[j].key)
          Object.assign(indriver, { [x]: x[0] })
        }


      }
      drivers.push(indriver);
      indriver = [];
      drivers[i].driverId = this.fleetDetail[i]._id;
    }

    let data = {
      fleetArray: trucks,
      driverArray: drivers,
      companyData: comp
    }
    this.alldata.push(data);
    console.log(this.alldata[0]);
    this.CompanyService.creattender(this.alldata[0]).subscribe(data => {
      console.log(data)
    },
    err=>{
      console.log(err)
    })
    this.alldata = [];

  }



  openacc(i){
    if(i==this.opens){
    this.opens=999999;
    return;
    }
    console.log(this.opens)
    this.opens=i;
  }
  opencomp(){
    this.compopen=!this.compopen;
  }
  opendriver(i){
    if(i==this.openss){
      this.openss=999999;
      return;
      }
    console.log(i)
    this.openss=i
  }
  select(s){
    this.active=s
  }
}
