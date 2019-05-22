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
      number: '',
      doc: '',
      valid_upto: ''
    },
    insurance: {
      number: '',
      doc: '',
      valid_upto: ''
    }
  }

  truckerr: boolean;
  selectedOption = ''
  doccuments = ['Rc', 'Insurance','explosive','abcd'];
  selected = {
    docnumber:'',
    valid:''
  };
  showdata = [];
  superadminid: string;
  userId: string;
  loader: boolean = false;
  trucknumber = "";
  ownership = ""
  selecterr: boolean;
  ownererr: boolean;

  validerr:boolean;
  docuerr:boolean;

  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
      CompanyService, private toastr: ToastrService) {

    this.superadminid = localStorage.getItem('SuperAdmin');

    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
  }

  check1(xy) {
    if (xy == "selectedOption") {
      if (this.selectedOption=='') {
        this.selecterr = true;
      }
      else {
        this.selecterr = false;
      }
    }

    if (xy == "docnumbers") {
      if (this.selected.docnumber=='') {
        this.docuerr = true;
      }
      else {
        this.docuerr = false;
      }
    }


    if (xy == "valid") {
      if (this.selected.valid=='') {
        this.validerr = true;
      }
      else {
        this.validerr = false;
      }
    }

  }

  add(x, y) {

    if (this.selectedOption == '') {
      this.selecterr = true;
      return;
    }
    if (this.selected.docnumber == '') {
      this.docuerr = true;
      return;
    }
    if (this.selected.valid == '') {
      this.validerr = true;
      return;
    }
    console.log(x, y)
    if (y == "Rc") {
      console.log("rc")
      this.data.rc.number = x.docnumber;
      this.data.rc.valid_upto = x.valid;

    }
    else if (y == "Insurance") {
      this.data.insurance.number = x.docnumber;
      this.data.insurance.valid_upto = x.valid;
    }
    console.log('ssss', this.data);

    var index = this.doccuments.indexOf(y);
    if (index > -1) {
      this.doccuments.splice(index, 1);
    }
    var data = {
      number: x.docnumber,
      valid: x.valid,
      name: y
    }
    this.vardata.push(data);
    this.selected = {
      docnumber:'',
      valid:''
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
      if (type == "Rc") {
        this.data.rc.doc = result.upload._id;
      }
      else if (type == "Insurance") {
        this.data.insurance.doc = result.upload._id;
      }
      console.log('ssss', this.data);
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
    else if (this.doccuments.length != 0) {
      alert('please provide all doccuments');
      return;
    }
    let data = {
      rc: this.data.rc,
      insurance: this.data.insurance,
      truck_number: this.trucknumber,
      Ownership: this.ownership,
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
