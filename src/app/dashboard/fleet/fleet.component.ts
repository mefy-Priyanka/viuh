import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IfStmt } from '@angular/compiler';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CompanyService } from 'src/app/service/company.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrls: ['./fleet.component.css']
})
export class FleetComponent implements OnInit {
  @ViewChild('mydoc') mydoc: ElementRef;

  vardata = [];
public fleet:boolean=true;

  truckerr: boolean;
  selectedOption = ''
  doccuments = ['Rc', 'vehicle_insurance', 'product_insurance', 'explosive',
    'calibration_chart', 'national_permit', 'national_permit_A',
    'national_permit_B', 'road_tax', 'pollution', 'sco', 'abs',
    'hydro_testing', 'fitness', 'other1', 'other2'];
  selected = {
    number: '',
    valid: '',
    file: '',
    fileid: ''
  };
  showdata = [];
  superadminid: string;
  userId: string;
  loader: boolean = false;
  trucknumber = "";
  ownership = ""
  selecterr: boolean;
  ownererr: boolean;

  validerr: boolean;
  docuerr: boolean;
  filerr: boolean;
  othername = ''
  otherbool: boolean;
  othername2 = ''
  other2bool: boolean;
  maindata = { userId: '', superadminid: '', others: [] };
  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
      CompanyService, private toastr: ToastrService) {

    this.superadminid = localStorage.getItem('SuperAdmin');

    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
    this.maindata.userId = this.userId;
    this.maindata.superadminid = this.superadminid
  }

  check1(xy, a) {
    console.log(xy, a)
    if (xy == "selectedOption") {
      if (this.selectedOption == '') {
        this.selecterr = true;
      }
      else {
        this.selecterr = false;
      }
    }

    if (xy == "numbers") {
      if (this.selected.number == '') {
        this.docuerr = true;
      }
      else {
        this.docuerr = false;
      }
    }


    if (xy == "valid") {
      if (this.selected.valid == '') {
        this.validerr = true;
      }
      else {
        this.validerr = false;
      }
    }
    if (xy == "file") {
      if (this.selected.file == '') {
        this.validerr = true;
      }
      else {
        this.validerr = false;
      }
    }

    if (a == 'other1') {
      this.otherbool = true;
    }
    else if (a != 'other1') {
      this.otherbool = false;
    }

    if (a == 'other2') {
      this.other2bool = true;
    }
    else if (a != 'other2') {
      this.other2bool = false;
    }
  }

  add(x, y) {

    if (this.selectedOption == '') {
      this.selecterr = true;
      return;
    }
    if (this.selected.number == '') {
      this.docuerr = true;
      return;
    }
    if (this.selected.file == '') {
      this.filerr = true;
      return;
    }
    if (this.selected.valid == '') {
      this.validerr = true;
      return;
    }
    console.log(this.selected);
    if (y == "Rc") {
      let rc = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: rc,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { rc: rc })
    }
    if (y == "vehicle_insurance") {
      console.log("vehicle_insurance")
      let vehicle_insurance = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: vehicle_insurance,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { vehicle_insurance: vehicle_insurance })
    }
    if (y == "product_insurance") {
      console.log("product_insurance")

      let product_insurance = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: product_insurance,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { product_insurance: product_insurance })
    }
    if (y == "explosive") {
      console.log("explosive")
      let explosive = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: explosive,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { explosive: explosive })
    }

    if (y == "calibration_chart") {
      console.log("calibration_chart")
      let calibration_chart = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: calibration_chart,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { calibration_chart: calibration_chart })
    }
    if (y == "national_permit") {
      console.log("national_permit")
      let national_permit = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: national_permit,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { national_permit: national_permit })
    }
    if (y == "national_permit_A") {
      console.log("national_permit_A")

      let national_permit_A = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: national_permit_A,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { national_permit_A: national_permit_A })
    }
    if (y == "national_permit_B") {
      console.log("national_permit_B")
      let national_permit_B = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: national_permit_B,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { national_permit_B: national_permit_B })
    }
    if (y == "road_tax") {
      console.log("road_tax")
      let road_tax = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: road_tax,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { road_tax: road_tax })
    }
    if (y == "pollution") {
      console.log("pollution")

      let pollution = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: pollution,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { pollution: pollution })
    }
    if (y == "sco") {
      console.log("sco")
      let pollution = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: pollution,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { pollution: pollution })
    }
    if (y == "abs") {
      console.log("abs")
      let abs = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: abs,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { abs: abs })
    }
    if (y == "hydro_testing") {
      console.log("hydro_testing")
      let hydro_testing = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: hydro_testing,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { hydro_testing: hydro_testing })
    }
    if (y == "fitness") {
      console.log("fitness")
      let fitness = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid
      }
      let some = {
        main: fitness,
        title: y
      }
      this.vardata.push(some);
      Object.assign(this.maindata, { fitness: fitness })
    }
    if (y == "other1") {
      console.log("other1")
      let other1 = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid,
        name: this.othername
      }
      let some = {
        main: other1,
        title: y
      }
      this.vardata.push(some);
      this.maindata.others.push(other1);
      // Object.assign(this.maindata, { others: [other1] });
    }
    if (y == "other2") {
      console.log("other2")
      let other2 = {
        number: this.selected.number,
        doc: this.selected.fileid,
        valid_upto: this.selected.valid,
        name: this.othername2
      }
      let some = {
        main: other2,
        title: y
      }
      this.vardata.push(some);
      this.maindata.others.push(other2);

      // if(!("others" in this.maindata)){
      //   Object.assign(this.maindata, { others: [other2] });
      // }
      // else{
      //   Object.assign(this.maindata, { others: [other2] });

      // }

    }




    console.log(this.vardata)

    var index = this.doccuments.indexOf(y);
    if (index > -1) {
      this.doccuments.splice(index, 1);
    }

    console.log(this.maindata)
    this.selected = {
      number: '',
      valid: '',
      file: '',
      fileid: ''
    };
    this.selectedOption = '';
    this.mydoc.nativeElement.value = "";
  }

  upload(event, type) {
    console.log(this.userId)
    console.log(event + 'file upload' + type)
    // console.log(event.target)
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.loader = true;
    this.companyService.fileUpload(formData).subscribe(response => {
      this.loader = false;
      this.toastr.success('Great !', 'File Successfully Uploaded'),
        console.log(response);
      let result: any = {};
      result = response;
      this.selected.fileid = result.upload._id

      // if (type == "Rc") {
      // this.data.rc.doc = result.upload._id;
      // }
    }, err => {
      console.log(err);
      // this.reset(type);
      this.loader = false;
      this.toastr.error('oops !', 'File Upload Failed');
    });
  }

  check(xy) {
    if (xy == 'trucknumber') {
      if (this.trucknumber == '') {
        this.truckerr = true;
      }
      else {
        this.truckerr = false;
      }
    }

    if (xy == 'ownership') {
      if (this.ownership == '') {
        this.ownererr = true;
      }
      else {
        this.ownererr = false;
      }
    }

  }
  submit() {
    if (this.trucknumber == '') {
      this.truckerr = true;
      return;
    }
    else if (this.ownership == '') {
      this.ownererr = true;
      return;
    }
    console.log('lenght', this.maindata.others.length)

    if (this.maindata.others.length == 0) {
      delete this.maindata['others'];
    }

    console.log(this.maindata);
    this.companyService.fleetcreation(this.maindata).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'fleet created successfully')
      location.reload();
    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }
  createFleet(){
    this.fleet=!this.fleet
  }
}
