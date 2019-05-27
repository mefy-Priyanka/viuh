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
  data = {
    rc: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    vehicle_insurance: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    product_insurance: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    explosive: {
      number: "",
      doc: "",
      valid_upto: ""
    },

    calibration_chart: {
      number: "",
      doc: "",
      valid_upto: ""
    },

    national_permit: {
      number: "",
      doc: "",
      valid_upto: ""
    },

    national_permit_A: {
      number: "",
      doc: "",
      valid_upto: ""
    },

    national_permit_B: {
      number: "",
      doc: "",
      valid_upto: ""
    },

    road_tax: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    pollution: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    sco: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    abs: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    hydro_testing: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    fitness: {
      number: "",
      doc: "",
      valid_upto: ""
    },
    others:[{
      name:'',
      number: "",
      doc: "",
      valid_upto: ""
    },
    {
      name:'',
      number: "",
      doc: "",
      valid_upto: ""
    },
  ]

  }

  truckerr: boolean;
  selectedOption = ''
  doccuments = ['Rc', 'vehicle_insurance', 'product_insurance', 'explosive',
    'calibration_chart', 'national_permit', 'national_permit_A',
    'national_permit_B', 'road_tax', 'pollution', 'sco', 'abs',
    'hydro_testing', 'fitness', 'other1','other2'];
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
  othername=''
  otherbool: boolean;
  othername2=''
  other2bool: boolean;
  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
      CompanyService, private toastr: ToastrService) {

    this.superadminid = localStorage.getItem('SuperAdmin');

    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
  }

  check1(xy,a) {
    console.log(xy,a)
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

    if(a=='other1'){
      this.otherbool=true;
    }
    else if(a!='other1'){
            this.otherbool=false;
    }
   
    if(a=='other2'){
      this.other2bool=true;
    }
    else if(a!='other2'){
            this.other2bool=false;
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
    console.log(y)
    console.log(this.selected);

    var data = {
      number: this.selected.number,
      valid_upto: this.selected.valid,
      doc: this.selected.fileid,
    }
    var s = {}
    if (y == "Rc") {
      console.log("rc")
      this.data.rc.doc=this.selected.fileid;
      this.data.rc.number=this.selected.number;
      this.data.rc.valid_upto=this.selected.valid
      let some={
        main:this.data.rc,
        title:y
      }
      this.vardata.push(some);
      
    }
    if (y == "vehicle_insurance") {
      console.log("vehicle_insurance")
      this.data.vehicle_insurance.doc=this.selected.fileid;
      this.data.vehicle_insurance.number=this.selected.number;
      this.data.vehicle_insurance.valid_upto=this.selected.valid;
      let some={
        main:this.data.vehicle_insurance,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "product_insurance") {
      console.log("product_insurance")
      this.data.product_insurance.doc=this.selected.fileid;
      this.data.product_insurance.number=this.selected.number;
      this.data.product_insurance.valid_upto=this.selected.valid
      let some={
        main:this.data.product_insurance,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "explosive") {
      console.log("explosive")
      this.data.explosive.doc=this.selected.fileid;
      this.data.explosive.number=this.selected.number;
      this.data.explosive.valid_upto=this.selected.valid
      let some={
        main:this.data.explosive,
        title:y
      }
      this.vardata.push(some);
    }

    if (y == "calibration_chart") {
      console.log("calibration_chart")
      this.data.calibration_chart.doc=this.selected.fileid;
      this.data.calibration_chart.number=this.selected.number;
      this.data.calibration_chart.valid_upto=this.selected.valid;
      let some={
        main:this.data.calibration_chart,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "national_permit") {
      console.log("national_permit")
      this.data.national_permit.doc=this.selected.fileid;
      this.data.national_permit.number=this.selected.number;
      this.data.national_permit.valid_upto=this.selected.valid;
      let some={
        main:this.data.national_permit,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "national_permit_A") {
      console.log("national_permit_A")
      this.data.national_permit_A.doc=this.selected.fileid;
      this.data.national_permit_A.number=this.selected.number;
      this.data.national_permit_A.valid_upto=this.selected.valid;
      let some={
        main:this.data.national_permit_A,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "national_permit_B") {
      console.log("national_permit_B")
      this.data.national_permit_B.doc=this.selected.fileid;
      this.data.national_permit_B.number=this.selected.number;
      this.data.national_permit_B.valid_upto=this.selected.valid;
      let some={
        main:this.data.national_permit_B,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "road_tax") {
      console.log("road_tax")
      this.data.road_tax.doc=this.selected.fileid;
      this.data.road_tax.number=this.selected.number;
      this.data.road_tax.valid_upto=this.selected.valid;
      let some={
        main:this.data.road_tax,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "pollution") {
      console.log("pollution")
      this.data.pollution.doc=this.selected.fileid;
      this.data.pollution.number=this.selected.number;
      this.data.pollution.valid_upto=this.selected.valid;
      let some={
        main:this.data.pollution,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "sco") {
      console.log("sco")
      this.data.sco.doc=this.selected.fileid;
      this.data.sco.number=this.selected.number;
      this.data.sco.valid_upto=this.selected.valid;
      let some={
        main:this.data.sco,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "abs") {
      console.log("abs")
      this.data.abs.doc=this.selected.fileid;
      this.data.abs.number=this.selected.number;
      this.data.abs.valid_upto=this.selected.valid;
      let some={
        main:this.data.abs,
        title:y
      }
      this.vardata.push(some);
    }
      if (y == "hydro_testing") {
      console.log("hydro_testing")
      this.data.hydro_testing.doc=this.selected.fileid;
      this.data.hydro_testing.number=this.selected.number;
      this.data.hydro_testing.valid_upto=this.selected.valid;
      let some={
        main:this.data.hydro_testing,
        title:y
      }
      this.vardata.push(some);
    }
      if (y == "fitness") {
      console.log("fitness")
      this.data.fitness.doc=this.selected.fileid;
      this.data.fitness.number=this.selected.number;
      this.data.fitness.valid_upto=this.selected.valid;
      let some={
        main:this.data.fitness,
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "other1") {
      console.log("other1")
      this.data.others[0].name=this.othername
      this.data.others[0].doc=this.selected.fileid;
      this.data.others[0].number=this.selected.number;
      this.data.others[0].valid_upto=this.selected.valid;
      let some={
        main:this.data.others[0],
        title:y
      }
      this.vardata.push(some);
    }
    if (y == "other2") {
      console.log("other2")
      this.data.others[1].name=this.othername
      this.data.others[1].doc=this.selected.fileid;
      this.data.others[1].number=this.selected.number;
      this.data.others[1].valid_upto=this.selected.valid;
      let some={
        main:this.data.others[1],
        title:y
      }
      this.vardata.push(some);
    }


console.log(this.vardata)

    var index = this.doccuments.indexOf(y);
    if (index > -1) {
      this.doccuments.splice(index, 1);
    }

console.log(this.data)
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
    // else if (this.doccuments.length != 0) {
    //   alert('please provide all doccuments');
    //   return;
    // }
    let data = {
      rc: this.data.rc,
      vehicle_insurance: this.data.vehicle_insurance,
      product_insurance: this.data.product_insurance,
      explosive: this.data.explosive,
      calibration_chart: this.data.calibration_chart,
      national_permit: this.data.national_permit,
      national_permit_A: this.data.national_permit_A,
      national_permit_B: this.data.national_permit_B,
      road_tax: this.data.road_tax,
      pollution: this.data.pollution,
      sco: this.data.sco,
      abs: this.data.abs,
      hydro_testing:this.data.hydro_testing,
      fitness:this.data.fitness,
      others: this.data.others,
      
      userId: this.userId,
      superAdminId: this.superadminid
    }
    console.log(data);
    this.companyService.fleetcreation(data).subscribe(result => {
      console.log(result);
      this.toastr.success('Awesome!', 'fleet created successfully')

    },
      err => {
        console.log(err)
        this.toastr.error('Error!', 'Server Error')

      })
  }
}
