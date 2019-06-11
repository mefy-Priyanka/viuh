import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/service/company.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {
  public workorder: boolean = true;

  tender_number = '';
  induction_tt = '';
  rate_quoted = [];
  tts = [];
  period = {
    start_date: '',
    end_date: ''
  }
  terms_condition: any = {};
  spcl_condition: any = {};
  transport_guide: any = {};
  pbta: any = {}
  worklist: any;


  constructor(private companyService:
    CompanyService, private toastr: ToastrService) { }
  createworkorder() {
    this.workorder = !this.workorder;
  }


  ngOnInit() {
    this.addtts();
    this.addquote();
    this.getwork()
  }

  addtts() {
    let temp = {
      quantity: '',
      uom: '',
      notes: ''
    }
    this.tts.push(temp)
  }

  addquote() {
    let temp = {
      item: '',
      rate: '',
      uom: '',
      notes: ''
    }
    this.rate_quoted.push(temp)
  }



  upload(event, type) {
    console.log(type)
    console.log(event + 'file upload' + type)
    let fileList: FileList = event.target.files;
    let fileTarget = fileList;
    let file: File = fileTarget[0];
    console.log("File information :", file.name);
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.companyService.fileUpload(formData).subscribe(response => {
      this.toastr.success('Great !', 'File Successfully Uploaded'),
        console.log(response);
      let result: any = {};
      result = response;

      if (type == "Special") {

        Object.assign(this.spcl_condition,{doc:result.upload._id})
        console.log(this.spcl_condition)
      }
      if (type == "Terms") {
        Object.assign(this.terms_condition,{doc:result.upload._id})
      }
      if (type == "Transport") {
        Object.assign(this.transport_guide,{doc:result.upload._id})
      }
      if (type == "Bulk") {
        Object.assign(this.pbta,{doc:result.upload._id})
      }
    }, err => {
      console.log(err);
      this.toastr.error('oops !', 'File Upload Failed');
    });
   
  }

getwork(){
  let some:any;

  this.companyService.getworkorder(localStorage.getItem('SuperAdmin')).subscribe(result=>{
    some=result
    console.log(some.result);
    this.worklist=some.result
  },
  err=>{
    console.log(err);
    this.toastr.error('oops','work order creation failed')

  })
}

  submit() {
    this.period.start_date=moment(this.period.start_date).toISOString()
    this.period.end_date=moment(this.period.end_date).toISOString()

    let data = {
      tender_number: this.tender_number,
      induction_tt: this.induction_tt,
      period: this.period,
      terms_condition: this.terms_condition,
      spcl_condition: this.spcl_condition,
      transport_guide: this.transport_guide,
      pbta: this.pbta,
      tts: this.tts,
      rate_quoted: this.rate_quoted,
      userId:localStorage.getItem('userId')
    }
    console.log(data)
    this.companyService.creatworkorder(data).subscribe(result=>{
      console.log(result);
      this.toastr.success('congo','work order successfully created')
      this.getwork();
      this.createworkorder();
    },
    err=>{
      console.log(err);
      this.toastr.error('oops','work order creation failed')

    })
  }
}
