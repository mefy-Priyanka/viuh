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
      rc_number: '',
      rc_doc: '',
      valid_upto: ''
    },
    insurance: {
      insurance_number: '',
      insurance_doc: '',
      valid_upto: ''
    }
  }


  selectedOption = ''
  doccuments = ['Rc', 'Insurance'];
  selected = {};
  showdata = [];
  superadminid: string;
  userId: string;
  loader: boolean = false;
  trucknumber = "";
  ownership = ""



  constructor(private formBuilder: FormBuilder,
    private router: Router, private companyService:
      CompanyService, private toastr: ToastrService) {

    this.superadminid = localStorage.getItem('SuperAdmin');

    this.userId = localStorage.getItem('userId');
  }

  ngOnInit() {
  }


  add(x, y) {

    console.log(x, y)
    if (y == "Rc") {
      console.log("rc")
      this.data.rc.rc_number = x.docnumber;
      this.data.rc.valid_upto = x.valid;

    }
    else if (y == "Insurance") {
      this.data.insurance.insurance_number = x.docnumber;
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
    this.selected = {};
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
        this.data.rc.rc_doc = result.upload._id;
      }
      else if (type == "Insurance") {
        this.data.insurance.insurance_doc = result.upload._id;
      }
      console.log('ssss', this.data);
    }, err => {
      console.log(err);
      // this.reset(type);
      this.loader = false;
      this.toastr.error('oops !', 'File Upload Failed');
    });
  }

  submit() {
    let data = {
      rac: this.data.rc,
      insurance: this.data.insurance,
      truck_number: this.trucknumber,
      Ownership: this.ownership,
      userId: this.userId,
      superAdminId: this.superadminid
    }
    console.log(data);
    this.companyService.fleetcreation(data).subscribe(result=>{
      console.log(result);

    },
    err=>{
      console.log(err)
    })
  }
}
